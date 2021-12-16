//import constants
import { ORDER_CREATE_REQUEST,
        ORDER_CREATE_SUCCESS,
        ORDER_CREATE_FAIL,
        ORDER_CREATE_RESET,

        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_FAIL,

        ORDER_PAYMENT_REQUEST,
        ORDER_PAYMENT_SUCCESS,
        ORDER_PAYMENT_FAIL,
        ORDER_PAYMENT_RESET,

        ORDER_STATUS_REQUEST,
        ORDER_STATUS_SUCCESS,
        ORDER_STATUS_FAIL,
        ORDER_STATUS_RESET,

        MY_ORDER_LIST_REQUEST,
        MY_ORDER_LIST_SUCCESS,
        MY_ORDER_LIST_FAIL,
        MY_ORDER_LIST_RESET,

        ORDER_LIST_REQUEST,
        ORDER_LIST_SUCCESS,
        ORDER_LIST_FAIL,
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


export const orderPaymentReducer = (state = { }, action) => {
    //check action type
    switch(action.type){
        //if request is received, set loading to true
        case ORDER_PAYMENT_REQUEST:
            return{
                loading: true
            }
        
        //if payment made successfully
        case ORDER_PAYMENT_SUCCESS:
            return{
                loading: false,
                paymentStatus: action.payload.data
            }
        //if failed to make payment successfully
        case ORDER_PAYMENT_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        //clear payment state once payment is made by returning empty object
        case ORDER_PAYMENT_RESET:
            return { }

        //return state by default
        default:
            return state
    }
}


export const orderStatusReducer = (state = { }, action) => {
    //check action type
    switch(action.type){
        //if request is received, set loading to true
        case ORDER_STATUS_REQUEST:
            return{
                loading: true
            }
        
        //if order status changed successfully
        case ORDER_STATUS_SUCCESS:
            return{
                loading: false,
                success: true,
                successMessage: action.payload
            }
        //if failed to change order status successfully
        case ORDER_STATUS_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        //clear state once order status is updated by returning empty object
        case ORDER_STATUS_RESET:
            return { }

        //return state by default
        default:
            return state
    }
}



//---reducer to pass request to retrieve all orders of specific user---
    // loading set to true by default
export const myOrdersReducer = (state = {orders:[]}, action) => {
    //check action type
    switch(action.type){
        //if request is received, set loading to true
        case MY_ORDER_LIST_REQUEST:
            return{
                loading: true
            }
        
        //if orders successfully retrieved, return orders list data from action.payload.
        case MY_ORDER_LIST_SUCCESS:
            return{
                loading: false,
                orders: action.payload.orders,
                page: action.payload.page,
                pages: action.payload.pages

            }
        //return error if failed to retrieve order list or if order doesn't exist
        case MY_ORDER_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        //clear order state once payment is made by returning empty object
        case MY_ORDER_LIST_RESET:
            return {
                orders : []
             }

        //return state by default
        default:
            return state
    }
}


//---reducer to pass request to retrieve all orders---
    // loading set to true by default
export const orderListReducer = (state = {orders:[]}, action) => {
    //check action type
    switch(action.type){
        //if request is received, set loading to true
        case ORDER_LIST_REQUEST:
            return{
                loading: true
            }
        
        //if orders successfully retrieved, return orders list data from action.payload.
        case ORDER_LIST_SUCCESS:
            return{
                loading: false,
                orders: action.payload.orders,
                page: action.payload.page,
                pages: action.payload.pages

            }
        //return error if failed to retrieve order list or if order doesn't exist
        case ORDER_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        //return state by default
        default:
            return state
    }
}




