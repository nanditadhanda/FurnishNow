//import axios
import axios from 'axios'

//import constants
import { PAYMENT_CREATE_REQUEST,
        PAYMENT_CREATE_SUCCESS,
        PAYMENT_CREATE_FAIL, 

        PAYMENT_UPDATE_REQUEST,
        PAYMENT_UPDATE_SUCCESS,
        PAYMENT_UPDATE_FAIL, 
    
    }
        from '../constants/paymentConstants'

//payment action
export const savePaymentInfo = (info) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve order
        dispatch({ type: PAYMENT_CREATE_REQUEST })
        

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
        const { data } = await axios.post(
            `/api/payment/save-payment-info/`,
            info,
            config
            )

        //if no error is caught - throw in ORDER_CREATE_SUCCESS action
        dispatch({
            type: PAYMENT_CREATE_SUCCESS,
            payload: data
        }) 
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type:  PAYMENT_CREATE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

//update payment info
export const updatePaymentInfo = (info) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve order
        dispatch({ type: PAYMENT_UPDATE_REQUEST })
        

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
        const { data } = await axios.put(
            `/api/payment/update-payment-info/`,
            info,
            config
            )

        //if no error is caught - throw in ORDER_CREATE_SUCCESS action
        dispatch({
            type: PAYMENT_UPDATE_SUCCESS,
            payload: data
        }) 
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type:  PAYMENT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })
    }
}