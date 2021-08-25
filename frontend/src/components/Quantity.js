//custom increment-decrement number input

//import components
import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import {CgMathPlus, CgMathMinus} from 'react-icons/cg'

//import redux and reducers
import {useDispatch, useSelector} from 'react-redux'
import {addToCart} from '../actions/cartActions'

//Quantity Function based component
const Quantity = ({max, prodQuantity="", initQty=0, productID="", min=0}) => {
    
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
        if(value > max){
            setQty(max);
            setChange(true)
        }     
    }

    const dispatch = useDispatch()

    if(increaseQty || decreaseQty || onChange ){
        prodQuantity({qty, initQty}) 

        if(change && productID){
            dispatch(addToCart(productID, qty))
            setChange(false)
        }
        
    }

    return (
        <div className="quantity">
            {/* decrement button */}
            <Button className="btn-secondary-light" onClick={decreaseQty  } disabled={qty===min}><CgMathMinus className="text-secondary"/></Button>
            {/* input box */}
            <Form.Control type="text" onChange={onChange} value={qty} name="qtyInput"/>
             {/* increment button */}
            <Button className="btn-secondary-light" onClick={increaseQty} disabled={qty===max}><CgMathPlus className="text-secondary"/></Button>        
        </div>
    )
}


export default Quantity
