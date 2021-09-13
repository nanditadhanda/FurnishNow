import axios from 'axios'
//import constants
import {    CART_ADD_PRODUCT, 
            CART_REMOVE_PRODUCT ,
            CART_SAVE_SHIPPING_ADDRESS,
            CART_SAVE_PAYMENT_METHOD
        } from '../constants/cartConstants'

//note: function inside a function makes an async function
// getState allows us to get any part of a state - it allows us to access local storage
export const addToCart = (id, qty, change) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_PRODUCT,
        payload: {
            product: data._id,
            name:   data.name,
            image: data.image,
            price: data.salePrice,
            countInStock: data.countInStock,
            category_slug : data.category_slug,
            slug: data.slug,
            change,
            qty
        }
    })

    //save cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_PRODUCT,
        payload: id
    })

    //update cart items
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//save shipping address action
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    //add shipping address to local storage
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

//action to save payment method
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    //save payment method to local storage
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}