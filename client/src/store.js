/* Redux Store */

//necessary redux imports
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import reducers
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, updateUserProfileReducer, usersListReducer, userDeleteReducer, userUpdateReducer, userStaffRegisterReducer} from './reducers/userReducers'
import { myOrdersReducer, orderCreateReducer, orderDetailsReducer, orderListReducer, orderPaymentReducer, orderStatusReducer } from './reducers/orderReducers'
import { categoryCreateReducer, categoryDeleteReducer, categoryDetailsReducer, categoryListReducer, categoryUpdateReducer } from './reducers/categoryReducers'
import { paymentReducer, paymentUpdateReducer } from './reducers/paymentReducers'
import { reportCategorySalesReducer, reportTotalsReducer } from './reducers/reportReducers'

//register and combine all reducers
const reducer = combineReducers({
    categoryList: categoryListReducer,
    categoryCreate: categoryCreateReducer,
    categoryDetails: categoryDetailsReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryDelete: categoryDeleteReducer,
    
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,    

    cart: cartReducer ,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userStaffRegister : userStaffRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: updateUserProfileReducer,
    usersList: usersListReducer,
    userDeleteAccount: userDeleteReducer,
    userUpdateAccount: userUpdateReducer,

    payment: paymentReducer,
    paymentUpdate: paymentUpdateReducer,
       
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPayment: orderPaymentReducer,
    orderStatus: orderStatusReducer,
    myOrders: myOrdersReducer,
    orderList: orderListReducer,

    reportTotals: reportTotalsReducer,
    reportCategorySales: reportCategorySalesReducer,
   
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
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin : {userInfo: userInfoFromStorage},

}

const middleware =[thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store