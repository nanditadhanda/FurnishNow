//import axios
import axios from 'axios'

//import constants
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,

    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,

    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,
}  from '../constants/userConstants'

import { MY_ORDER_LIST_RESET } from '../constants/orderConstants'

//login action: takes in email and password -> make api call and get back token and register user

export const login = (email, password) => async (dispatch) => {
     //try-catch exception
    try {
        //dispatch action to throw user_login_request
        dispatch({ type: USER_LOGIN_REQUEST })
        
        //configuration of post request
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }

        }
        //load data by making api call - post request
        const { data } = await axios.post(
            '/api/users/login/',
            { 'email' : email, 'password' : password},
            config
            )

        //if no error is caught - throw in USER_LOGIN_SUCCESS action
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //set login user and set user login details in local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}

//logout action
export const logout = () => (dispatch) => {
    //clear local storage
    localStorage.removeItem('userInfo')

    //dispatch logout reducer to clear state from redux
    dispatch({ type: USER_LOGOUT })
    //dispatch reducer to clear user account details
    dispatch({type: USER_DETAILS_RESET})
    // dispatch reducer to clear order list of logged in user
    dispatch({type: MY_ORDER_LIST_RESET})
    //dispatch reducer to clear list of users
    dispatch({type: USER_LIST_RESET})
}

//register user action
export const register = (first_name, last_name, email, password) => async(dispatch) => {
     //try-catch exception
    try {
        //dispatch action to throw user_registration_request
        dispatch({ type: USER_REGISTER_REQUEST })
        
        //configuration of post request
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }

        }
        //load data by making api call - post request
        const { data } = await axios.post(
            '/api/users/register/',
            {   'first_name' : first_name,
                'last_name' : last_name,
                'username' : email, 
                'email' : email,
                'password' : password
                
            },
            config
            )

        //if no error is caught - throw in USER_LOGIN_SUCCESS action
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        //login user immediately
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //set login user and set user login details in local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


//user profile details
export const getUserDetails = (id) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve user details
        dispatch({ type: USER_DETAILS_REQUEST })

        //get user info (object) of logged in user from userLogin state
        const { userLogin : {userInfo} } = getState()
        
        //configuration of get request
        const config = {
            headers : {
                'Content-type' : 'application/json',
                //authorization token to allow us to retrieve user info
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        //load data by making api call - get request
        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
            )

        //if no error is caught - throw in USER_LOGIN_SUCCESS action
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })    
       
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


//update user profile
export const updateUserProfile = (user) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve user details
        dispatch({ type: USER_PROFILE_UPDATE_REQUEST })

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
            `/api/users/profile/update/`,
            user,
            config
            )

        //if no error is caught - throw in USER_PROFILE_UPDATE_SUCESS action
        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: data
        })    

        //trigger user login to re-login user with updated information
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })  

        //reset user info details in local storage
        localStorage.setItem('userInfo', JSON.stringify(data))
       
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


//List users action
export const listUsers = () => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve list of users
        dispatch({ type: USER_LIST_REQUEST })

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
        const { data } = await axios.get(
            `/api/users/`,
            config
            )


        //if no error is caught - throw in USER_LIST_SUCCESS action
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })    

       
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}


//delete user
export const deleteUser = (id) => async(dispatch, getState) => {
     //try-catch exception
    try {
        //dispatch action to throw request to retrieve list of users
        dispatch({ type: USER_DELETE_REQUEST })

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
        const { data } = await axios.delete(
            `/api/users/delete/${id}`,
            config
            )

        //if no error is caught - throw in USER_DELETE_SUCCESS action
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })    

       
    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}