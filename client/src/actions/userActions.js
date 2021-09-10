//import axios
import axios from 'axios'

//import constants
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
}  from '../constants/userConstants'

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
            '/api/users/login',
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
    dispatch({
       type: USER_LOGOUT
    })
}