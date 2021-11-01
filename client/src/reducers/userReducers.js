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

    USER_UPDATE_REQUEST,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_RESET,

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
            return { loading: false, success: true, userInfo: action.payload}

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

        //reset state by returning empty object
        case USER_DETAILS_RESET:
            return { }
        
        //return state by default
        default:
            return state
    }

}

//update user profile details reducer 
export const updateUserProfileReducer = (state = { }, action) => {
    //check action type passed in reducer
    switch(action.type){
        //request to update profile
        case USER_PROFILE_UPDATE_REQUEST:
            return { loading: true }

        //if successfully updated, set loading to false and set userInfo state to data passed in payload
        case USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true ,userInfo: action.payload }

        //if error, return error message in state
        case USER_PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        
        //reset state by returning empty object
        case USER_PROFILE_UPDATE_RESET:
            return { }
        
        //return state by default
        default:
            return state
    }

}

//list all users reducer 
export const usersListReducer = (state = {users:[] }, action) => {
    //check action type passed in reducer
    switch(action.type){
        //request to retrieve list of all users
        case USER_LIST_REQUEST:
            return { loading: true }

        //if request received and data retreived, pass data retrieved into users array
        case USER_LIST_SUCCESS:
            return { loading: false ,users: action.payload }

        //if error, return error message in state
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        
        //reset state by returning empty array
        case USER_LIST_RESET:
            return {users:[] }
        
        //return state by default
        default:
            return state
    }

}


//delete user reducer
export const userDeleteReducer = (state = {}, action) => {
    //check action type passed in reducer
    switch(action.type){
        //request to delete user
        case USER_DELETE_REQUEST:
            return { loading: true }

        //if request received and user deleted, return success as true
        case USER_DELETE_SUCCESS:
            return { loading: false ,success: true }

        //if error, return error message in state
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        
      
        //return state by default
        default:
            return state
    }

}

//update user reducer
export const userUpdateReducer = (state = {user:{}}, action) => {
    //check action type passed in reducer
    switch(action.type){
        //request to update user account
        case USER_UPDATE_REQUEST:
            return { loading: true }

        //if request received and user updated, return success as true
        case USER_UPDATE_SUCCESS:
            return { loading: false ,success: true }

        //if error, return error message in state
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        //reset state and empty user object
        case USER_UPDATE_RESET:
            return { user:{}}
        
      
        //return state by default
        default:
            return state
    }

}

