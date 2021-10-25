//reducer is a function that takes the current state and takes in action of what we want to do with the state. - then it manipulates our state and returns back a new copy of the state

//import variables
import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

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
            return { 
                    loading: false, 
                    products: action.payload.products,
                    page: action.payload.page,
                    pages: action.payload.pages
            }

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

//Product Reducers - All products
export const productDeleteReducer = (state = {}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to load data
        case PRODUCT_DELETE_REQUEST:
            return { loading: true}
        
        //if data has been loaded successfully
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true}

        //action to return error if data fails to load
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        //by default, return current state
        default:
            return state

    }

}

//Product Reducers - All products
export const productCreateReducer = (state = {}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to create product
        case PRODUCT_CREATE_REQUEST:
            return { loading: true}
        
        //if product has been created successfully
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload}

        //action to return error if data fails to create
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        
        //reset state once product is created
        case PRODUCT_CREATE_RESET:
            return { }

        //by default, return current state
        default:
            return state

    }
}

//update product reducer
export const productUpdateReducer = (state = {product:{}}, action) => {
    //check action type passed in reducer
    switch(action.type){
        //request to update product
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }

        //if request received and product updated, return success as true
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false ,success: true , product: action.payload}

        //if error, return error message in state
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        //reset state and empty product object
        case PRODUCT_UPDATE_RESET:
            return { product:{}}
        
      
        //return state by default
        default:
            return state
    }

}


// create review
export const productCreateReviewReducer = (state = {}, action) => {
    //check action type passed in reducer
    switch(action.type){
        //request to create product review
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }

        //if request received and review created, return success as true
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false ,success: true }

        //if error, return error message in state
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        //reset state and empty product object
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        
      
        //return state by default
        default:
            return state
    }

}