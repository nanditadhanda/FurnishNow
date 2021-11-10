import React, {useState, useEffect} from 'react'

//THREE.js modules and controls
import * as THREE from 'three/build/three.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//UI compontents
import {Button} from 'react-bootstrap'
import PopoverTooltip from './PopoverTooltip'
import AddToCart from './AddToCart'
import Quantity from './Quantity'
import Message from './Message'
import Loader from './Loader'





const AR = ({model3D="", productID, max}) => {

  //----------- initializing states, variables and constants ----------//

  const { XRWebGLLayer } = window

  // to display debug information
  const [info, setInfo] = useState('')
  // button to start XR experience
  const [xrButton, setXRButton] = useState("XR not found")     
  //check if XR is supported or not
  const [supported, setSupported] = useState(false)

  // to control the xr session
  let [xrSession, setXRSession] = useState(null)

  // reference space used within an application https://developer.mozilla.org/en-US/docs/Web/API/XRSession/requestReferenceSpace
  let xrRefSpace = null;
  // for hit testing with detected surfaces
  let xrHitTestSource = null;
  // Canvas OpenGL context used for rendering
  let gl = null;

  let vec = null;

  //------ popover info -----

  const [popoverTitle, setPopoverTitle] = useState('')
  const [popoverDesc, setPopoverDesc] = useState('')

  const [ loading, setLoading] = useState(false)

  //---------------- THREE.js ------------------//

  //---- variables
  let renderer = null;
  let scene = null;
  let camera = null;
  let model = null;
  
  let mixer = null;
  let action = null;
  let reticle = null;
  let lastFrame = Date.now();


  const [modelPlaced, setModelPlaced] = useState(false)



  //initial scene
  const initScene = (gl, session) => {

    //new scene and camera objects
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    // load our gltf model
    var loader = new GLTFLoader();
    loader.load(
      model3D,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(1.0, 1.0, 1.0);
        model.castShadow = true;
        model.receiveShadow = true;
        // mixer = new THREE.AnimationMixer(model);
        // action = mixer.clipAction(gltf.animations[0]);
        // action.setLoop(THREE.LoopRepeat, 0);
      },
      () => {},
      (error) => console.error(error)
    );

    //lighting
    var light = new THREE.PointLight(0xffffff, 2, 100); // soft white light
    light.position.z = 1;
    light.position.y = 5;
    scene.add(light);

    // create and configure three.js renderer with XR support
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      autoClear: true,
      context: gl,
    })
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType("local");
    renderer.xr.setSession(session);

    // simple sprite to indicate detected surfaces
    reticle = new THREE.Mesh(
      new THREE.RingBufferGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshPhongMaterial({ color: 0x0fff00 })
    );
    // we will update it's matrix later using WebXR hit test pose matrix
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    console.log("scene initialized")
  }


  //----------------- Immersive-AR XRSession ---------------------------//

  

  //if webxr is supported, allow onButtonClicked handler to be called
  const onButtonClicked = () => {
    
    if (xrSession === null) {                  
        navigator.xr.requestSession('immersive-ar', {
            optionalFeatures: ['dom-overlay'],
            requiredFeatures: ['local', 'hit-test'],
            domOverlay: {root: document.getElementById('overlay')}
        }).then((session) => {             
          onSessionStarted(session)          
        })
        
    } else {    
      xrSession.end()       
    }
  }

  //when immersive-ar session starts
  const onSessionStarted = (session) =>{
    
    setXRSession(xrSession = session)

    // Show which type of DOM Overlay got enabled (if any)
    if (session.domOverlayState) {
     setInfo('DOM Overlay type: ' + session.domOverlayState.type)
    }

    //function to call when session is ended
    session.onend = onSessionEnded

    // create a canvas element and WebGL context for rendering
    let canvas = document.createElement('canvas');
    gl = canvas.getContext("webgl", { xrCompatible: true });
    session.updateRenderState({ baseLayer: new XRWebGLLayer(xrSession, gl) });

    //loader
    setLoading(true)

    // here we ask for viewer reference space, since we will be casting a ray
    // from a viewer towards a detected surface. The results of ray and surface intersection
    // will be obtained via xrHitTestSource variable
    session.requestReferenceSpace("viewer").then((refSpace) => {
      session
        .requestHitTestSource({ space: refSpace })
        .then((hitTestSource) => {
          xrHitTestSource = hitTestSource;
        });
    });


    xrSession.requestReferenceSpace('local').then((refSpace) => {
      xrRefSpace = refSpace;
      // start WebXR rendering loop
      session.requestAnimationFrame(onXRFrame);
    });

    document
          .getElementById("overlay")
          .addEventListener("click", placeObject);


    if(xrSession !== null){
      setXRButton('Exit AR')
    }

    // initialize three.js scene
        initScene(gl, session);
   
  }

  function onRequestSessionError(ex) {
    setInfo("Failed to start AR session.")
    console.error(ex.message);
  }


  //once immersive-ar session ends
  const onSessionEnded = (event) => {
      setXRSession(null);
      setXRButton( 'View in AR')
      setModelPlaced(false)
      setInfo('')
      gl = null;

      if (xrHitTestSource) xrHitTestSource.cancel();
      xrHitTestSource = null;
  }

  function placeObject() {
        if (reticle.visible && model) {
          reticle.visible = false;
          xrHitTestSource.cancel();
          xrHitTestSource = null;
          // we'll be placing our object right where the reticle was
          vec = new THREE.Vector3()
          const pos = reticle.getWorldPosition(vec);
          scene.remove(reticle);
          model.position.set(pos.x, pos.y, pos.z);
          scene.add(model);
          setModelPlaced(true)

          

          // start object animation right away
          //toggleAnimation();
          // instead of placing an object we will just toggle animation state
          document
            .getElementById("overlay")
            .removeEventListener("click", placeObject);
          // document
          //   .getElementById("overlay")
          //   .addEventListener("click", toggleAnimation);

          
        }

        
      }

      // function toggleAnimation() {
      //   if (action.isRunning()) {
      //     action.stop();
      //     action.reset();
      //   } else {
      //     action.play();
      //   }
      // }

      // // Utility function to update animated objects
      // function updateAnimation() {
      //   let dt = (Date.now() - lastFrame) / 1000;
      //   lastFrame = Date.now();
      //   if (mixer) {
      //     mixer.update(dt);
      //   }
      // }

      function onXRFrame(t, frame) {
        let session = frame.session;
        session.requestAnimationFrame(onXRFrame);

        if (xrHitTestSource) {
          // obtain hit test results by casting a ray from the center of device screen
          // into AR view. Results indicate that ray intersected with one or more detected surfaces
          const hitTestResults = frame.getHitTestResults(xrHitTestSource);
          if (hitTestResults.length) {
            // obtain a local pose at the intersection point
            const pose = hitTestResults[0].getPose(xrRefSpace);
            // place a reticle at the intersection point
            reticle.matrix.fromArray(pose.transform.matrix);
            reticle.visible = true;
            setLoading(false)
          }
        } else {
          // do not show a reticle if no surfaces are intersected
          reticle.visible = false;
        }

        // update object animation
        //updateAnimation();
        // bind our gl context that was created with WebXR to threejs renderer
        gl.bindFramebuffer(
          gl.FRAMEBUFFER,
          session.renderState.baseLayer.framebuffer
        );
        // render the scene
        renderer.render(scene, camera);
      }


      function resetHandler (){
        
        console.log("reset")
      }

      
    

  
  // use effect to initialize component
  useEffect(() => {
        //-- TO DO : PUT IN TRY-CATCH
  //check if webxr is supported
  const checkSupportedState = () => {
   
    if(navigator.xr){
      navigator.xr.isSessionSupported('immersive-ar').then((isSupported) => {
        setSupported(isSupported)
        if (isSupported && model3D !== null) {
          setXRButton('View in AR')
          setPopoverTitle('3D model using immersive-AR')
          setPopoverDesc(
              <div>
                <p className="text-justify">"View in AR" allows you to view how the product will look like in your home setting by accessing your device camera and overlaying a 3D model of the product in your selected placement.</p>
                <ol>
                  <li>Click 'View in AR' button</li>
                  <li>Allow your browser to access your device's camera</li>
                  <li>Wait for reticle to appear after FurnishNow scans the area through your camera.</li>
                  <li>Once Reticle appears, tap on the screen to place the object.</li>
                </ol>
                 <p className="text-justify text-danger"><strong>Please Note: </strong>FurnishNow ensures your privacy is not breached. Data from your camera will not be recorded or stored in any form. Your camera will not be accessed when AR-mode is not active.</p>
              </div>)
        } else if (isSupported && model3D === null){
          setXRButton('3D model unavailable')
          setPopoverTitle('3D model unavailable')
          setPopoverDesc(`3D model is not available for this product. We apologize for the inconvenience caused`)
        }   else{
          setXRButton('AR not supported')
          setPopoverTitle('Immersive-AR Pre-requisites')
          setPopoverDesc(<div>
                              <p className="text-justify">AR is not supported on your browser window. Please open application on a mobile device with one of the following mobile web browers to enjoy our immersive AR experience: </p>
                              <ul>
                                <li>Chrome: version 79+</li>
                                <li>Opera: version 66+</li>
                                <li>Edge: version 79+</li>
                                <li>Mozilla: version 90+</li>
                                <li className="text-danger">Safari: Not Supported</li>
                              </ul>
                            </div>) 
        }    
      }) 
    }
    else {
      console.log("WebXR is not available!")
    }
  }


    // checkXR
     if (!window.isSecureContext) {
        document.getElementById("warning").innerText = "WebXR unavailable. Please use secure context" 
      }
      if (navigator.xr) { // check to see if WebXR is supported
        navigator.xr.addEventListener('devicechange', checkSupportedState) 
        checkSupportedState() 
      } else {
        document.getElementById("warning").innerText = "WebXR unavailable for this browser" 
      }


  
    
  }, [model3D])

  
//-------------------------- AR Mode UI Functions ---------------//
const [qty, setQuantity] = useState (0)
const [show, setShow] = useState(false)
const [qtyError, setQtyError] = useState(false)

const updateQty = (qtyInput) => { 
    setQuantity(qtyInput.qty)            
}
const updateMsg = ({show, error}) => {
    setShow(show)
    setQtyError(error)
}


  return (
    <div id="overlay" className={`${xrSession !== null && "my-2"}`}>
      <div className="info-area">
        <div id="info">{info}</div>  
        {/* If WebXR is supported on device and 3D model is */}
        { (supported && model3D !== null) ?
          <Button id="xr-button" className="btn-success" onClick={onButtonClicked}>{xrButton}</Button>
            :
              <Button className="btn-secondary" id="xr-button" disabled>{xrButton}</Button>
        }
        {modelPlaced && 
            <>
              {/* <Button id="resetModel" onClick={resetHandler} >Reset</Button> */}
               {show && 
                    <div className="py-2">
                    <Message variant="success" >    
                        Product has been added to your shopping cart
                    </Message>
                    </div>
                }
              <div className="position-fixed bottom-0 w-100 p-4 bg-light">
                {qtyError &&
                <Message variant="danger">Error: Select Quantity</Message>}
                {/* Quantity selector */}
                <div className="d-flex justify-content-evenly  ">
                    {/* Quantity selector */}
                    <Quantity prodQuantity={updateQty} initQty={0}  max={max} productID={productID} />
                    <AddToCart productID={productID} qty={qty} msgShow={updateMsg}/>
                </div>             
              </div>
            </>}
           {xrSession ===  null && 
            <PopoverTooltip title={popoverTitle} content={popoverDesc}/>}
            {xrSession && loading && 
              <div className="d-flex align-items-center ">
                <Loader />
              </div>}
        
        
      </div>
    </div>
  )
}

export default AR
