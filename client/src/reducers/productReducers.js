//reducer is a function that takes the current state and takes in action of what we want to do with the state. - then it manipulates our state and returns back a new copy of the state

//import variables
import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'


//Product Reducers - All products
export const productListReducer = (state = {products:[]}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to load data
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: []}
        
        //if data has been loaded successfully
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload}

        //action to return error if data fails to load
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        //by default, return current state
        default:
            return state

    }

}


//Product Detail Reducers - Single products
export const productDetailsReducer = (state = {product:{reviews:[]}}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to load data
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        
        //if data has been loaded successfully
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload}

        //action to return error if data fails to load
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        //by default, return current state
        default:
            return state

    }

}