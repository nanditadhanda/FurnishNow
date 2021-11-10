import React, {useEffect} from 'react'


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


import { Card } from 'react-bootstrap'

const AR2 = () => {


    return (
        <>
        <Card>
            <model-viewer 
                src="https://cdn.glitch.com/25ee8113-90ae-41db-b783-fbbab7de2fc3%2FScene.glb?v=1592251067411"
                ios-src="https://cdn.glitch.com/25ee8113-90ae-41db-b783-fbbab7de2fc3%2FSpinning_Rings.usdz?v=1592249454231"             
                shadow-intensity="1" 
                ar ar-mode="WebXR"
                camera-controls 
                interaction-prompt="auto"
                 magic-leap
                xr-environment
                alt="A 3D model carousel"
            />
        </Card>
        
        </>
    )
}

export default AR2
