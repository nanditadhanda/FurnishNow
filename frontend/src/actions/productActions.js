import axios from 'axios'
//import variables for actions
import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL
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
        const { data } = await axios.get('api/products/')

        //if no error is caught - throw in PRODUCT_LIST_REQUEST action
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }
    //if error is caught 
    catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message 
                    ? error.response.data.message
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
    //if error is caught 
    catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                    ? error.response.data.message
                    : error.message
        })

    }
}