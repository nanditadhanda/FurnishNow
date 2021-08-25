//necessary redux imports
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import reducers
import { productListReducers, productDetailsReducers } from './reducers/productReducers'
import {cartReducers} from './reducers/cartReducers'
//register and combine all reducers
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers ,
})

/*------cart------- */

//get items from local storage if items exist in cart
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage
    }
}

const middleware =[thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store