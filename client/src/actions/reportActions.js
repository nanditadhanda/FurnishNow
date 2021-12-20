import { 
    REPORT_TOTALS_REQUEST,
    REPORT_TOTALS_SUCCESS,
    REPORT_TOTALS_FAIL,

    REPORT_CATEGORY_REQUEST,
    REPORT_CATEGORY_SUCCESS,
    REPORT_CATEGORY_FAIL,
 } from "../constants/reportConstants";

 import axios from "axios";

 //action to get total values
export const getTotalValues = () => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve total values
        dispatch({ type: REPORT_TOTALS_REQUEST })

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of get request with user authentication token
        const config = {
            headers : {
                'Content-type' : 'application/json',
                //authorization token to allow us to retrieve user info
                Authorization: `Bearer ${userInfo.token}`
            }
        }        

        //send out post api request
        const { data } = await axios.get(
            `/api/reports/orders_total`,
            config
            )
       
        //if no error is caught
        dispatch({
            type: REPORT_TOTALS_SUCCESS,
            payload: data,
        })        
    }
    //if error is caught 
    catch(error){
        dispatch({
            type: REPORT_TOTALS_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

//action to get total values
export const getCategorySales = () => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve total values
        dispatch({ type: REPORT_CATEGORY_REQUEST })

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of get request with user authentication token
        const config = {
            headers : {
                'Content-type' : 'application/json',
                //authorization token to allow us to retrieve user info
                Authorization: `Bearer ${userInfo.token}`
            }
        }        

        //send out post api request
        const { data } = await axios.get(
            `/api/reports/category_sales`,
            config
            )
       
        //if no error is caught
        dispatch({
            type: REPORT_CATEGORY_SUCCESS,
            payload: data,
        })        
    }
    //if error is caught 
    catch(error){
        dispatch({
            type: REPORT_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

