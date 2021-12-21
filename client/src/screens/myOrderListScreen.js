import React, {useEffect} from 'react'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import user details action
import { myOrdersList } from '../actions/orderActions'


//UI components
import {Container} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import OrderCard from '../components/OrderCard'

const MyOrderListScreen = ({history}) => {

     //-----------Authentications and page access control -------------//

    //check login state to see if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    //destructure login state
    const {userInfo} = userLogin

    //set dispatch
    const dispatch = useDispatch()

    let paginate = history.location.search

    //conditions to check to allow user to access place order screen
    useEffect(() => {
       
        //if user is not logged in, display login page    
        if(!userInfo){
            history.push(`/login?redirect=my-orders`)
        }
        else{
             //get order list
            dispatch(myOrdersList(paginate))  
        }
       
    }, [history, userInfo, dispatch, paginate])

    //------------------------ Get Order List -------------------- //
    
   

    //get order list state
    const myOrders = useSelector(state => state.myOrders)
    //destructure state
    const {loading, error, orders, page, pages} = myOrders


    return (
        <Container className="py-5">
            
                <h2 className="pb-4">My Orders</h2>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">Error: {error}</Message>
                ) : (
                    orders.map(order => (
                        <OrderCard order={order}  key={order._id}/>                   
                        
                    ))
                )}

                <Paginate path='/my-orders' page={page} pages={pages} />
            
        </Container>   )
}


export default MyOrderListScreen
