import React, {useState, useEffect} from 'react'

//Routing
import { LinkContainer } from 'react-router-bootstrap'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import userList action
import { listOrders } from '../actions/orderActions'

//UI components
import {Table, Button, Container} from 'react-bootstrap'
import {RiCheckFill, RiCloseFill} from 'react-icons/ri'
import { IoTrashSharp } from 'react-icons/io5'
import {IoMdPersonAdd} from 'react-icons/io'
import {MdEdit} from 'react-icons/md'

import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = ({history}) => {
    //set dispatch
    const dispatch = useDispatch()

    //select orderList state
    const orderList = useSelector(state => state.orderList)
    //destructure state
    const {loading, error, orders} = orderList


    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {    
        if(userInfo && userInfo.isSystemAdmin){
            dispatch(listOrders())
        }
        else{
            history.push("/accessdenied")
        }     
    },[dispatch, history, userInfo])


    return (
        <section>
            <h1>Orders</h1>
            { /*show loader if loading */
            loading ? <Loader />
                /*else if an error occured, display error message */
                : error ? <Message variant="danger">{error}</Message>
                /*else show page content */
                : ( <>
                    
                    <Table striped bordered responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Total Amount (MYR)</th>
                                <th className="text-center">Paid</th>
                                <th >Status</th>
                                <th></th>
                            </tr>                            
                        </thead>
                        <tbody>
                            {orders.reverse().map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && (order.user.first_name)}</td>
                                    <td>{order.orderDate.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td className="text-center">{order.isPaid ? <RiCheckFill className="text-success"/>
                                                : <RiCloseFill className="text-danger"/>}</td>
                                    <td>{order.orderStatus}</td> 
                                    <td><LinkContainer to={`/admin/order/${order._id}`}>
                                            <Button variant="outline-success"   className="">Details</Button>
                                        </LinkContainer></td>  
                                </tr>
                            ))}
                            
                        </tbody>

                    </Table>
                    </>
                )}
            
        </section>
    )
}

export default OrderListScreen
