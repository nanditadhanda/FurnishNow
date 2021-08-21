import axios from 'axios'
import { CART_ADD_PRODUCT , CART_REMOVE_PRODUCT} from '../constants/cartConstants'

//note: function inside a function makes an async function
// getState allows us to get any part of a state - it allows us to access local storage


export const addToCart = (id, qty) => async(dispatch, getState) => {
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