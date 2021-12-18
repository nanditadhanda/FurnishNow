import { CATEGORY_LIST_REQUEST,
        CATEGORY_LIST_SUCCESS,
        CATEGORY_LIST_FAIL,

        CATEGORY_DETAILS_SUCCESS,
        CATEGORY_DETAILS_REQUEST,
        CATEGORY_DETAILS_FAIL,

        CATEGORY_CREATE_REQUEST,
        CATEGORY_CREATE_SUCCESS,
        CATEGORY_CREATE_FAIL,
        CATEGORY_CREATE_RESET,

        CATEGORY_UPDATE_REQUEST,
        CATEGORY_UPDATE_SUCCESS,
        CATEGORY_UPDATE_FAIL,
        CATEGORY_UPDATE_RESET,

        CATEGORY_DELETE_REQUEST,
        CATEGORY_DELETE_SUCCESS,
        CATEGORY_DELETE_FAIL,
    
    } from '../constants/categoryConstants'

//CATEGORY Reducers - All CATEGORYs
export const categoryListReducer = (state = {categories:[]}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to load data
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: []}
        
        //if data has been loaded successfully
        case CATEGORY_LIST_SUCCESS:
            return { 
                    loading: false, 
                    categories: action.payload,
                    // page: action.payload.page,
                    // pages: action.payload.pages
            }

        //action to return error if data fails to load
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }

        //by default, return current state
        default:
            return state

    }
}

//Category Detail Reducers - Single categorys
export const categoryDetailsReducer = (state = {category:{}}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to load data
        case CATEGORY_DETAILS_REQUEST:
            return { loading: true, ...state }
        
        //if data has been loaded successfully
        case CATEGORY_DETAILS_SUCCESS:
            return { loading: false, category: action.payload}

        //action to return error if data fails to load
        case CATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        //by default, return current state
        default:
            return state

    }

}

//create category reducers
export const categoryCreateReducer = (state = {}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to create CATEGORY
        case CATEGORY_CREATE_REQUEST:
            return { loading: true}
        
        //if category has been created successfully
        case CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, category: action.payload}

        //action to return error if data fails to create
        case CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload }
        
        //reset state once category is created
        case CATEGORY_CREATE_RESET:
            return { }

        //by default, return current state
        default:
            return state

    }
}

export const categoryDeleteReducer = (state = {}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to load data
        case CATEGORY_DELETE_REQUEST:
            return { loading: true}
        
        //if data has been loaded successfully
        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true}

        //action to return error if data fails to load
        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload }

        //by default, return current state
        default:
            return state

    }
}

//update category reducer
export const categoryUpdateReducer = (state = {category:{}}, action) => {
    //check action type passed in reducer
    switch(action.type){
        //request to update CATEGORY
        case CATEGORY_UPDATE_REQUEST:
            return { loading: true }

        //if request received and CATEGORY updated, return success as true
        case CATEGORY_UPDATE_SUCCESS:
            return { loading: false ,success: true , category: action.payload}

        //if error, return error message in state
        case CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        //reset state and empty CATEGORY object
        case CATEGORY_UPDATE_RESET:
            return { }
          
        //return state by default
        default:
            return state
    }

}