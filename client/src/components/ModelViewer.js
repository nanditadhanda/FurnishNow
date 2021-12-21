import React, {useState} from 'react'


import "@google/model-viewer"

//Web Components polyfill to support Edge and Firefox < 63
import "@webcomponents/webcomponentsjs"

//Intersection Observer polyfill for better performance in Safari and IE11
import "intersection-observer"

//Resize Observer polyfill improves resize behavior in non-Chrome browsers
import "resize-observer-polyfill"

//Fullscreen polyfill is needed to fully support AR feature
import "fullscreen-polyfill"

//Include prismatic.js for Magic Leap support
import "@magicleap/prismatic"


import { Card, Button, Modal } from 'react-bootstrap'

const ModelViewer = ({model3D="", ios_model3D = "", product}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
        {model3D !== null ?
            <Button variant="primary" onClick={handleShow} className="me-2 mb-2">View 3D Model</Button>
            : <Button variant="secondary" disabled>3D Model Unavailable</Button>
        }
        
        <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>    
                <div className="d-flex justify-content-between w-100">
                    <h5 className="m-0">{product.name}</h5>
                    <h5 className="m-0 pe-2 text-success">RM {product.salePrice}</h5>  
                </div>
            </Modal.Header>
            <Modal.Body>
                <Card className="w-100">
                    <model-viewer 
                        src={model3D}
                        ios-src="https://cdn.glitch.com/25ee8113-90ae-41db-b783-fbbab7de2fc3%2FSpinning_Rings.usdz?v=1592249454231"             
                        shadow-intensity="2"              
                        camera-controls 
                        interaction-prompt="auto"
                        magic-leap
                        xr-environment
                        alt={product.name}
                        className="model-viewer"
                        style={{"width":"100%", "height" : "100%", "minHeight" : "50vh"}}  
                    />
                </Card>
            </Modal.Body>
            <Modal.Footer >
                <Button onClick={handleClose}>Close</Button>  
            </Modal.Footer>
        </Modal>
        
        </>
    )
}

export default ModelViewer
