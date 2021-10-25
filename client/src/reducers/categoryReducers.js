import { CATEGORY_LIST_REQUEST,
        CATEGORY_LIST_SUCCESS,
        CATEGORY_LIST_FAIL} from '../constants/categoryConstants'

//CATEGORY Reducers - All products
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