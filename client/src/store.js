//necessary redux imports
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import reducers
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, updateUserProfileReducer} from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers'

//register and combine all reducers
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer ,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: updateUserProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer
})

/*------cart------- */

//get items from local storage if items exist in cart
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

//get shipping address from local storage 
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

//pull data from local storage to load state with data
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null



//set initial state with data retrieved from local storage
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin : {userInfo: userInfoFromStorage},

}

const middleware =[thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store