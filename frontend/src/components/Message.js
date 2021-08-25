import React, { useState } from 'react'
import {Alert} from 'react-bootstrap'


const Message = ({variant, children, dismissable="false", show=false}) => {
    const [show2, setShow] = useState(true)
   
    if(dismissable){
        if(show) {
            return (
           <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                 {children}
            </Alert>
        )
        }
        else{
            return ""
        }
        
    }
    return (
        <Alert variant={variant} onClose={() => setShow(false)} dismissable >
                {children}
            </Alert>
    )
}

export default Message
