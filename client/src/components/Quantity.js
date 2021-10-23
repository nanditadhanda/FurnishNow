//custom increment-decrement number input

//import components
import React, {useState, useEffect} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {CgMathPlus, CgMathMinus} from 'react-icons/cg'

//import redux and reducers
import {useDispatch} from 'react-redux'
import {addToCart} from '../actions/cartActions'

//Quantity Function based component
const Quantity = ({max, prodQuantity="", initQty=0, productID="", min=0, cartPage=false}) => {
    
    const [qty, setQty] = useState(initQty)
    const [cartQty, setCartQty] = useState(0)
    const [change, setChange] = useState(false)

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

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
        if(change){
            if(cartPage){
            dispatch(addToCart(productID, qty))
            setChange(false)
            }else{
                
                if(cartQty !==0){
                    if(qty+cartQty <= max){
                        prodQuantity({qty: (qty+cartQty), productID}) 
                    }
                    else{
                        prodQuantity({qty: max, productID}) 
                    }           
                }
                else{
                    prodQuantity({qty, productID})
                }    
                setChange(false)
            }      
        }    
    }

    useEffect(() => {
        if(cartItems.length > 0){
                cartItems.map(x => (
                    (parseInt(x.product) === parseInt(productID)) &&
                        setCartQty(x.qty)                                                         
                ))
        }        
          
    }, [cartItems, setCartQty, productID, cartQty, qty, cartPage])

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
