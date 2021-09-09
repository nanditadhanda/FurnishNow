import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
}  from '../constants/userConstants'

//Product Reducers - All products
export const userLoginReducers = (state = { }, action) => {

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