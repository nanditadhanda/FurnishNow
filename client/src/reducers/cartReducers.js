//import constants
import { CART_ADD_PRODUCT
        , CART_REMOVE_PRODUCT } from '../constants/cartConstants'

//cart reducer
export const cartReducer = (state = { cartItems: [] } , action) => {
    switch (action.type){
        case CART_ADD_PRODUCT:
            const item = action.payload
            
            //check if item exists in cart
            const existItem = state.cartItems.find(x => x.product === item.product)

            //if item exists in cart
            if(existItem){

            //    state.cartItems.map(x => 
            //             x.product === existItem.product && parseFloat(existItem.qty + x.qty) <= item.countInStock
            //                 ? item.qty = parseFloat(x.qty + existItem.qty)
            //                 : x)
                console.log('New Val: ', item)

                // console.log(state.cartItems.map(x => 
                //         x.product === existItem.product ? item : item))
                return{
                    //return state
                    ...state,

                    //replace existing item with new values
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x)
                }

            }
            else {
                return {
                    //return state
                    ...state,
                    //return existing cart items and add new item to array
                    cartItems:[...state.cartItems, item]
                }
            }
        
        case CART_REMOVE_PRODUCT:
            return{
                ...state,
                //filter keeps all products that matches the id passed in action.payload
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        default:
            return state

    }
}
