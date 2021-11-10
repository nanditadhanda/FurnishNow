//import constants
import { PAYMENT_CREATE_REQUEST,
        PAYMENT_CREATE_SUCCESS,
        PAYMENT_CREATE_FAIL,
        PAYMENT_CREATE_RESET,

        PAYMENT_UPDATE_REQUEST,
        PAYMENT_UPDATE_SUCCESS,
        PAYMENT_UPDATE_FAIL,
        PAYMENT_UPDATE_RESET,
    
    }
        from '../constants/paymentConstants'


export const paymentReducer = (state = { }, action) => {
    //check action type
    switch(action.type){
        //if request is received, set loading to true
        case PAYMENT_CREATE_REQUEST:
            return{
                loading: true
            }
        
        //if payment record created successfully
        case PAYMENT_CREATE_SUCCESS:
            return{
                loading: false,
                info: action.payload
            }
        //if failed to create payment record successfully
        case PAYMENT_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        //clear payment state once payment is made by returning empty object
        case PAYMENT_CREATE_RESET:
            return { }

        //return state by default
        default:
            return state
    }
}

export const paymentUpdateReducer = (state = { }, action) => {
    //check action type
    switch(action.type){
        //if request is received, set loading to true
        case PAYMENT_UPDATE_REQUEST:
            return{
                loading: true
            }
        
        //if payment record created successfully
        case PAYMENT_UPDATE_SUCCESS:
            return{
                loading: false,
                info: action.payload
            }
        //if failed to create payment record successfully
        case PAYMENT_UPDATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        //clear payment state once payment is made by returning empty object
        case PAYMENT_UPDATE_RESET:
            return { }

        //return state by default
        default:
            return state
    }
}