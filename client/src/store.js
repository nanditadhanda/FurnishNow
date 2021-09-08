//necessary redux imports
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import reducers
import { productListReducers, productDetailsReducers } from './reducers/productReducers'
import {cartReducers} from './reducers/cartReducers'
import { userLoginReducers } from './reducers/userReducers'

//register and combine all reducers
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers ,
    userLogin: userLoginReducers,
})

/*------cart------- */

//get items from local storage if items exist in cart
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

//pull data from local storage to load state with data
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

//set initial state with data retrieved from local storage
const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin : {userInfo: userInfoFromStorage}

}

const middleware =[thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store