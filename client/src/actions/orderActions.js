//import axios to make api calls
import axios from 'axios'

//import constants
import { ORDER_CREATE_REQUEST,
        ORDER_CREATE_SUCCESS,
        ORDER_CREATE_FAIL,

        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_FAIL,
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
        //dispatch action to throw request to create order
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
        console.log(config)

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

