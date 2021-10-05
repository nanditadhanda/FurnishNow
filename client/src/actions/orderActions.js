//import axios to make api calls
import axios from 'axios'

//import constants
import { ORDER_CREATE_REQUEST,
        ORDER_CREATE_SUCCESS,
        ORDER_CREATE_FAIL,

        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_FAIL,

        ORDER_PAYMENT_REQUEST,
        ORDER_PAYMENT_SUCCESS,
        ORDER_PAYMENT_FAIL,

        MY_ORDER_LIST_REQUEST,
        MY_ORDER_LIST_SUCCESS,
        MY_ORDER_LIST_FAIL,

        ORDER_LIST_REQUEST,
        ORDER_LIST_SUCCESS,
        ORDER_LIST_FAIL,
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

//create new order action
export const createOrder = (order) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to create order
        dispatch({ type: ORDER_CREATE_REQUEST })
        

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of post request with user authentication token
        const config = {
            headers : {
                'Content-type' : 'application/json',
                //authorization token to allow logged in user to place order
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        console.log(config)

        //send out POST api request with data passed in
        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
            config
            )

        
       
        //if no error is caught - throw in ORDER_CREATE_SUCCESS action
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })    

        //clear cart once order is created successfully
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })   
        //remove from local storage
        localStorage.removeItem('cartItems')
       
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


//retrieve order details action
export const getOrderDetails = (id) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve order
        dispatch({ type: ORDER_DETAILS_REQUEST })
        

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of post request with user authentication token
        const config = {
            headers : {
                'Content-type' : 'application/json',
                //authorization token to allow logged in user to place order
                Authorization: `Bearer ${userInfo.token}`
            }

        }

        //send out POST api request with data passed in
        const { data } = await axios.get(
            `/api/orders/${id}`,
            config
            )

        
       
        //if no error is caught - throw in ORDER_CREATE_SUCCESS action
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })    

    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

//retrieve orders of logged in user action
export const myOrdersList = ( ) => async(dispatch, getState) => {
 
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve order list
        dispatch({ type: MY_ORDER_LIST_REQUEST })

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of post request with user authentication token
        const config = {
            headers : {
                'Content-type' : 'application/json',
                //authorization token to allow logged in user to place order
                Authorization: `Bearer ${userInfo.token}`
            }

        }

        //send out GET api request with data passed in
        const { data } = await axios.get(
            `/api/orders/myorders`,
            config
            )
        
       
        //if no error is caught - throw in ORDER_CREATE_SUCCESS action
        dispatch({
            type: MY_ORDER_LIST_SUCCESS,
            payload: data
        })    

    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: MY_ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


//payment action
export const payOrder = (id, paymentResult) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve order
        dispatch({ type: ORDER_PAYMENT_REQUEST })
        

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of post request with user authentication token
        const config = {
            headers : {
                'Content-type' : 'application/json',
                //authorization token to allow logged in user to place order
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        console.log(config)

        //send out POST api request with data passed in
        const { data } = await axios.put(
            `/api/orders/${id}/payment`,
            paymentResult,
            config
            )
       
        //if no error is caught - throw in ORDER_CREATE_SUCCESS action
        dispatch({
            type: ORDER_PAYMENT_SUCCESS,
            payload: data
        })    

    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: ORDER_PAYMENT_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


//retrieve orders of logged in user action
export const listOrders = ( ) => async(dispatch, getState) => {
 
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve order list
        dispatch({ type: ORDER_LIST_REQUEST })

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of post request with user authentication token
        const config = {
            headers : {
                'Content-type' : 'application/json',
                //authorization token to allow logged in user to place order
                Authorization: `Bearer ${userInfo.token}`
            }

        }

        //send out GET api request with data passed in
        const { data } = await axios.get(
            `/api/orders/`,
            config
            )
        
       
        //if no error is caught - throw in ORDER_LIST_SUCCESS action
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })    

    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}
