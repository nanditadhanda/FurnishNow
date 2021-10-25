import axios from 'axios'
import { CATEGORY_LIST_REQUEST,
        CATEGORY_LIST_SUCCESS,
        CATEGORY_LIST_FAIL} from '../constants/categoryConstants'

export const listCategories = () => async (dispatch) => {
    //try-catch exception
    try {
        //dispatch action to throw product_list_request
        dispatch({ type: CATEGORY_LIST_REQUEST })

        
        
        //load data by making api call
        const { data } = await axios.get('/api/categories/')

        console.log("data: ", data)

        //if no error is caught - throw in PRODUCT_LIST_REQUEST action
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })

    }
    //if error is caught  -- error message comes from backend
    catch(error){
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                    ? error.response.data.detail
                    : error.message
        })

    }
}
