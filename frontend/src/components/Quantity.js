//custom increment-decrement number input

//import components
import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import {CgMathPlus, CgMathMinus} from 'react-icons/cg'

//Quantity Function based component
const Quantity = ({max, prodQuantity, initQty=0, productID="", min=0}) => {
    
    const [qty, setQty] = useState(initQty)
    const [change, setChange] = useState(false)

    //increase value if quantity is less than max available
    const increaseQty = () => {
        setQty(qty>=max ? max : qty + 1)
        setChange(true)
    }

    //decrease value if quantity is not less than 0
    const decreaseQty = () => {
        setQty(qty <= min ? min : qty - 1)
        setChange(true)
    }

    //allow value to be input manually
    const onChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 0 && value <= max) {
            setQty(value);
            setChange(true)                    
        }   
    }

    if(increaseQty || decreaseQty || onChange ){
        prodQuantity({qty, productID, initQty, change}) 
    }

    return (
        <div className="quantity">
            {/* decrement button */}
            <Button className="btn-secondary-light" onClick={decreaseQty} disabled={qty===min}><CgMathMinus className="text-secondary"/></Button>
            {/* input box */}
            <Form.Control type="text" onChange={onChange} value={qty} name="qtyInput"/>
             {/* increment button */}
            <Button className="btn-secondary-light" onClick={increaseQty} disabled={qty===max}><CgMathPlus className="text-secondary"/></Button>        
        </div>
    )
}


export default Quantity
