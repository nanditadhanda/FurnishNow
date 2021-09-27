//import constants
import { ORDER_CREATE_REQUEST,
        ORDER_CREATE_SUCCESS,
        ORDER_CREATE_FAIL,

        ORDER_CREATE_RESET,

        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_FAIL,
} from '../constants/orderConstants'

//reducer to pass request to create order
export const orderCreateReducer = (state = {}, action) => {
    //check action type
    switch(action.type){
        //if request is received, set loading to true
        case ORDER_CREATE_REQUEST:
            return{
                loading: true
            }
        
        //if order is successfully created, return order data from action.payload.
        case ORDER_CREATE_SUCCESS:
            return{
                loading: false,
                success: true,
                order: action.payload

            }
        //return error if order failed to create
        case ORDER_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        //clear cart and order items once order is created by returning empty object
        case ORDER_CREATE_RESET:
            return { }
            
        //return state by default
        default:
            return state
    }

}


//---reducer to pass request to retrieve order details---
    // loading set to true by default
    // orderItems passed into state and set as array
    // shipping address passed into state and set as object
export const orderDetailsReducer = (state = {loading: true, orderItems:[], shippingAddress:{} }, action) => {
    //check action type
    switch(action.type){
        //if request is received, set loading to true
        case ORDER_DETAILS_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        //if order details successfully retrieved, return order data from action.payload.
        case ORDER_DETAILS_SUCCESS:
            return{
                loading: false,
                success: true,
                order: action.payload

            }
        //return error if failed to retrieve order or if order doesn't exist
        case ORDER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        //return state by default
        default:
            return state
    }

}

