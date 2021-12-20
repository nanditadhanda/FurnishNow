import axios from 'axios'
import { bindActionCreators } from 'redux'
//import variables for actions
import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConstants'


//action to get product list API call 
    //using redux thunk, we are able to create a function within a function:
    //dispatch is used to dispatch actions
    //keyword is for search results - by default set to an empty string
export const listProducts = (keyword='', ordering='', filter='') => async (dispatch) => {
    //try-catch exception
    try {
        //dispatch action to throw product_list_request
        dispatch({ type: PRODUCT_LIST_REQUEST })

        if(keyword ===''){
            keyword = `?ordering=${ordering}&${filter}`
        }
        else{
            keyword = `${keyword}&ordering=${ordering}&${filter}`       
        }
        
        //load data by making api call
        const { data } = await axios.get(`/api/products/${keyword}`)

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

//action to create product
export const createProduct = () => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to create product
        dispatch({ type: PRODUCT_CREATE_REQUEST })

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

        //send out create api request
        const { data } = await axios.post(
            `/api/products/create`,
            {},
            config
            )

        //if no error is caught - throw in delete product success action
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
            success:true,
        })          
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

//action to update product
export const updateProduct = (product) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to update product
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

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

        //send out put api request
        const { data } = await axios.put(
            `/api/products/update/${product._id}`,
            product,
            config
            )

        //if no error is caught - throw in delete product success action
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        }) 
        
        //update product details
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
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



//action to create product review
export const createProductReview = (product_id, review) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to create product review
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

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

        //send out post api request
        const { data } = await axios.post(
            `/api/products/${product_id}/review`,
            review,
            config
            )

        
        //if no error is caught - throw in product review success action
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        }) 
        
        
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


