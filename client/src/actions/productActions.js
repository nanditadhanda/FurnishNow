import axios from 'axios'
//import variables for actions
import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
} from '../constants/productConstants'


//action to get product list API call 
    //using redux thunk, we are able to create a function within a function:
    //dispatch is used to dispatch actions
export const listProducts = () => async (dispatch) => {
    //try-catch exception
    try {
        //dispatch action to throw product_list_request
        dispatch({ type: PRODUCT_LIST_REQUEST })
        
        //load data by making api call
        const { data } = await axios.get(`/api/products/`)

        console.log("data: ", data)

        //if no error is caught - throw in PRODUCT_LIST_REQUEST action
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

//action to get single product details
export const listProductDetails = (id) => async (dispatch) => {
    //try-catch exception
    try {
        //dispatch action to throw product_list_request
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        
        //load data by making api call
        const { data } = await axios.get(`/api/products/${id}`)

        //if no error is caught - throw in PRODUCT_LIST_REQUEST action
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }
    //if error is caught -- custom error message comes from backend 
    catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


//action to delete product
export const deleteProduct = (id) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to delete product
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of put request with user authentication token
        const config = {
            headers : {
                'Content-type' : 'application/json',
                //authorization token to allow us to retrieve user info
                Authorization: `Bearer ${userInfo.token}`
            }

        }

        //send out delete api request
        const { data } = await axios.delete(
            `/api/products/delete/${id}`,
            config
            )

        //if no error is caught - throw in delete product success action
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })          
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}