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

}  from '../constants/userConstants'

//User Login Reducers
export const userLoginReducer = (state = { }, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to login
        case USER_LOGIN_REQUEST:
            return { loading: true}
        
        //if login successful
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload}

        //if login not successful
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        //clears state
        case USER_LOGOUT:
            return { }

        //by default, return current state
        default:
            return state
    }
}

//User register reducers
export const userRegisterReducer = (state = { }, action) => {
    //check action type passed in reducer
    switch(action.type){
        //if request to register, set loading to true
        case USER_REGISTER_REQUEST:
            return { loading: true }

        //if successfully registered, set loading to false and set userInfo state to data passed in payload
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        //if error, return error message in state
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        
        //clear state if action is logout
        case USER_LOGOUT:
            return { }
        
        //return state by default
        default:
            return state
    }

}

//user profile details reducer 
//-- passing in user object in the state
export const userDetailsReducer = (state = { user: {} }, action) => {
    //check action type passed in reducer
    switch(action.type){
        //if request to register, set loading to true
        case USER_DETAILS_REQUEST:
            //return original state (spread out the state using ...)
            return {...state, loading: true }

        //if successfully registered, set loading to false and set userInfo state to data passed in payload
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        //if error, return error message in state
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        
        //return state by default
        default:
            return state
    }

}