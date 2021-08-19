import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import {CgMathPlus, CgMathMinus} from 'react-icons/cg'

const Quantity = ({max}) => {
    //local state - quantity
    const [qty, setQty] = useState(0)

    //increase value if quantity is less than max available
    const increaseQty = () => setQty(qty>=max ? max : qty + 1)

    //decrease value if quantity is not less than 0
    const decreaseQty = () => setQty(qty <= 0 ? 0 : qty - 1)

    //allow value to be input manually
    const onChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 0 && value <= max) {
            setQty(value);
        }
    }

    return (
        <div className="quantity">
            {/* decrement button */}
            <Button className="btn-secondary-light" onClick={decreaseQty}><CgMathMinus className="text-secondary"/></Button>
            {/* input box */}
            <Form.Control type="text" onChange={onChange} value={qty} name="quantity"/>
             {/* increment button */}
            <Button className="btn-secondary-light" onClick={increaseQty}><CgMathPlus className="text-secondary"/></Button>        
        </div>
    )
}

export default Quantity
