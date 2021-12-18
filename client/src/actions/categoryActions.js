import axios from 'axios'
import { CATEGORY_LIST_REQUEST,
        CATEGORY_LIST_SUCCESS,
        CATEGORY_LIST_FAIL,

        CATEGORY_DETAILS_REQUEST,
        CATEGORY_DETAILS_SUCCESS,
        CATEGORY_DETAILS_FAIL,

        CATEGORY_CREATE_REQUEST,
        CATEGORY_CREATE_SUCCESS,
        CATEGORY_CREATE_FAIL,

        CATEGORY_UPDATE_REQUEST,
        CATEGORY_UPDATE_SUCCESS,
        CATEGORY_UPDATE_FAIL,

        CATEGORY_DELETE_REQUEST,
        CATEGORY_DELETE_SUCCESS,
        CATEGORY_DELETE_FAIL,
    
        } from '../constants/categoryConstants'

export const listCategories = () => async (dispatch) => {
    //try-catch exception
    try {
        //dispatch action to throw category_list_request
        dispatch({ type: CATEGORY_LIST_REQUEST })        
        
        //load data by making api call
        const { data } = await axios.get('/api/categories/')

        //if no error is caught - throw in CATEGORY_LIST_REQUEST action
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })

    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

//action to get single category details
export const listCategoryDetails = (slug) => async (dispatch) => {
    //try-catch exception
    try {
        //dispatch action to throw category_list_request
        dispatch({ type: CATEGORY_DETAILS_REQUEST })
        
        //load data by making api call
        const { data } = await axios.get(`/api/categories/${slug}`)

        //if no error is caught - throw in CATEGORY_LIST_REQUEST action
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data
        })

    }
    //if error is caught -- custom error message comes from backend 
    catch(error){
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

//create category
//action to create category
export const createCategory = (categoryData) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to create category
        dispatch({ type: CATEGORY_CREATE_REQUEST })

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of put request with user authentication token
        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data',
                //authorization token to allow us to retrieve user info
                Authorization: `Bearer ${userInfo.token}`
            }

        }

        //load data by making api call - post request
        const { data } = await axios.post(
            '/api/categories/create',
            categoryData,
            config
            )

        //if no error is caught - throw in delete category success action
        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
            success:true,
        })          
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

//action to update category
export const updateCategory = (categoryData, id) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to update category
        dispatch({ type: CATEGORY_UPDATE_REQUEST })

        //get user info (object) of logged in user from userLogin state
        const { userLogin : { userInfo } } = getState()
        
        //configuration of put request with user authentication token
        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data',
                //authorization token to allow us to retrieve user info
                Authorization: `Bearer ${userInfo.token}`
            }

        }

        //send out put api request
        const { data } = await axios.put(
            `/api/categories/update/${id}`,
            categoryData,
            config
            )

        //if no error is caught - throw in delete category success action
        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data,
        }) 
        
        //update category details
        dispatch({type: CATEGORY_DETAILS_SUCCESS, payload: data})
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


//action to delete category
export const deleteCategory = (id) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to delete category
        dispatch({ type: CATEGORY_DELETE_REQUEST })

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
        await axios.delete(
            `/api/categories/delete/${id}`,
            config
            )

        //if no error is caught - throw in delete category success action
        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
        })          
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}
