//necessary redux imports
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import reducers
import { productListReducers, productDetailsReducers } from './reducers/productReducers'

//register and combine all reducers
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
})

const initialState = {}

const middleware =[thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store