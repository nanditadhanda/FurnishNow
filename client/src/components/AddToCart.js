import React, { useState, useEffect} from 'react'

//import redux components
import {useDispatch} from 'react-redux'

//import actions
import {addToCart} from '../actions/cartActions'

import {Button} from 'react-bootstrap'

const AddToCart = ({productID, qty=0, msgShow="", qtyError=""}) => {

    //message
    const [show, setShow] = useState(false)
    //error
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
    const addToCartHandler = () => {

        if(qty > 0){
            setShow(true)
            dispatch(addToCart(productID, qty))
            setShow(true)
            setError(false)
        }else{
            setShow(false)
            setError(true)
            console.log("Update Quantity Value" , qty)
        }
            // ? history.push(`/cart/${productID}?qty=${productQty}`)
    }

    useEffect(() => {
      msgShow({show, error})  
    }, [msgShow, show, error, qty])

    return (
        <Button variant="outline-primary" type='button' onClick={addToCartHandler}>Add To Cart</Button>
    )
}

export default AddToCart
