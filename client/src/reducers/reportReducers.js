import { 
    REPORT_TOTALS_REQUEST,
    REPORT_TOTALS_SUCCESS,
    REPORT_TOTALS_FAIL,

    REPORT_CATEGORY_REQUEST,
    REPORT_CATEGORY_SUCCESS,
    REPORT_CATEGORY_FAIL,
 } from "../constants/reportConstants";



//reducer to request for total figures
export const reportTotalsReducer = (state = {}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to load data
        case REPORT_TOTALS_REQUEST:
            return { loading: true }
        
        //if data has been loaded successfully
        case REPORT_TOTALS_SUCCESS:
            return { loading: false, data: action.payload}

        //action to return error if data fails to load
        case REPORT_TOTALS_FAIL:
            return { loading: false, error: action.payload }

        //by default, return current state
        default:
            return state
    }
}

//reducer to request for total figures
export const reportCategorySalesReducer = (state = {}, action) => {

    //switch statement to see what type of action is passed
    switch (action.type) {
        //request to load data
        case REPORT_CATEGORY_REQUEST:
            return { loading: true }
        
        //if data has been loaded successfully
        case REPORT_CATEGORY_SUCCESS:
            return { loading: false, data: action.payload}

        //action to return error if data fails to load
        case REPORT_CATEGORY_FAIL:
            return { loading: false, error: action.payload }

        //by default, return current state
        default:
            return state

    }

}
