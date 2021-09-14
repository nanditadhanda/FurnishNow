//import constants
import { ORDER_CREATE_REQUEST,
        ORDER_CREATE_SUCCESS,
        ORDER_CREATE_FAIL,
        ORDER_CREATE_RESET,
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

