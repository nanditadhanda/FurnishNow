import React, { useState } from 'react'
import {Alert} from 'react-bootstrap'


const Message = ({variant, children, dismissable="false", show=false}) => {
    const [show2, setShow] = useState(show)
   
    return (
            <Alert variant={variant} onClose={() => setShow(false)} dismissable={dismissable} >
                {children}
            </Alert>
    )
}

export default Message
