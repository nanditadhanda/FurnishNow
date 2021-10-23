import React, {useState, useEffect} from 'react'
import * as THREE from 'three/build/three.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const AR = () => {

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

  // Canvas OpenGL context used for rendering
  let gl = null;


  //-- TO DO : PUT IN TRY-CATCH

  //check if webxr is supported
  const checkSupportedState = () => {
   
    if(navigator.xr){
      navigator.xr.isSessionSupported('immersive-ar').then((isSupported) => {
        setSupported(isSupported)
        if (isSupported) {
          setXRButton('View in AR')
        } else {
          setXRButton('AR not found')
          console.log("WebXR doesn't support immersive-ar mode!") 
        }       
      }) 
    }
    else {
      console.log("WebXR is not available!")
    }
  }

  //if webxr is supported, allow onButtonClicked handler to be called
  const onButtonClicked = () => {
    console.log("xrSession 1: ", xrSession)
    if (xrSession === null) { 
                  
        navigator.xr.requestSession('immersive-ar', {
            optionalFeatures: ['dom-overlay'],
            requiredFeatures: ['local', 'hit-test'],
            domOverlay: {root: document.getElementById('overlay')}
        }).then((session) => {             
          onSessionStarted(session)          
        })
        
    } else { 
      console.log("xrSession 3: ", xrSession)    
      xrSession.end()
      setXRSession(null)           
    }
  }

  //when immersive-ar session starts
  const onSessionStarted = (session) =>{
    
    setXRSession(xrSession = session)

    // Show which type of DOM Overlay got enabled (if any)
    if (session.domOverlayState) {
     setInfo('DOM Overlay type: ' + session.domOverlayState.type)
    }

    session.onend = onSessionEnded
    console.log("xrSession 4: ", xrSession)

    // create a canvas element and WebGL context for rendering
    let canvas = document.createElement('canvas');
    gl = canvas.getContext('webgl', { xrCompatible: true });
    session.updateRenderState({ baseLayer: new XRWebGLLayer(xrSession, gl) });

    xrSession.requestReferenceSpace('local').then((refSpace) => {
      xrRefSpace = refSpace;
      // start WebXR rendering loop
      session.requestAnimationFrame(onXRFrame);
    });

    if(xrSession !== null){
      setXRButton('Exit AR')
    }
   
  }

  function onRequestSessionError(ex) {
    setInfo("Failed to start AR session.")
    console.error(ex.message);
  }


  //once immersive-ar session ends
  const onSessionEnded = (event) => {
      setXRSession(null);
      setXRButton( 'Enter AR')
      setInfo('')
      gl = null;
  }

  //on the frame once session starts
  const onXRFrame = (t, frame) => {
    let session = frame.session;
    session.requestAnimationFrame(onXRFrame);
    let pose = frame.getViewerPose(xrRefSpace);
    if (!pose) {
      return;
    }
    const pos = pose.transform.position;
    setInfo(`x:${pos.x.toFixed(2)}m y:${pos.y.toFixed(2)}m z:${pos.z.toFixed(2)}m`)
  }

  
  // use effect to initialize component
  useEffect(() => {
    // checkXR()

     if (!window.isSecureContext) {
        document.getElementById("warning").innerText = "WebXR unavailable. Please use secure context" 
      }
      if (navigator.xr) { // check to see if WebXR is supported
        navigator.xr.addEventListener('devicechange', checkSupportedState) 
        checkSupportedState() 
      } else {
        document.getElementById("warning").innerText = "WebXR unavailable for this browser" 
      }
    
  }, [])



  return (
    <div id="overlay">
      <div className="info-area">
        <div id="info">{info}</div>
        { supported ?
          <button id="xr-button" onClick={onButtonClicked}>{xrButton}</button>
            :
              <button id="xr-button" disabled>{xrButton}</button>

        }
        
      </div>
    </div>
  )
}

export default AR
