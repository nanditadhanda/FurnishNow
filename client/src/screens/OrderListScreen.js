import React, {useEffect, useState} from 'react'

//Routing
import { LinkContainer } from 'react-router-bootstrap'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import userList action
import { listOrders } from '../actions/orderActions'

//UI components
import {Table, Button, Container, Row, Col} from 'react-bootstrap'


import Message from '../components/Message'
import Loader from '../components/Loader'
import SideBar from '../components/SideBar'

import Paginate from '../components/Paginate'


import {HiSortDescending, HiSortAscending} from 'react-icons/hi'


const OrderListScreen = ({history}) => {
    //set dispatch
    const dispatch = useDispatch()

    //select orderList state
    const orderList = useSelector(state => state.orderList)
    //destructure state
    const {loading, error, orders, page, pages} = orderList

    //sorting feature
    const [ordering, setOrdering] = useState('-_id')

    const [path, setPath] = useState('')

    const tableTitle = ['ID', 'Customer', 'Date', 'Total Cost (MYR)' , 'Order Status']
    const [sort] = useState(['_id' , 'user__first_name', 'orderDate', 'totalPrice', 'orderStatus'])


    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    let paginate = history.location.search

    //client side access control
    useEffect(() => {    
        if(userInfo && (userInfo.isSystemAdmin || userInfo.isStoreManager)){
           
            dispatch(listOrders(paginate, ordering))

            if(userInfo.isSystemAdmin){
                setPath('/admin/orderlist')
            }else{
                setPath('/store-manager/orderlist')
            }

        }
        else{
            history.push("/accessdenied")
        }     
    },[dispatch, history, userInfo,ordering, paginate])

    //set sorting feature
    const orderingHandler = (order, i) => {
        setOrdering(order)

        //toggle between assending and descending
        if(sort[i].substring(0,1) === '-'){
            //remove minus operator
           sort[i] = sort[i].slice(1)
        }else{
            //reverse minus operator for all other table headers
            for(let j = 0; j < sort.length ; j++){
                if(sort[j].substring(0,1) === '-'){
                    sort[j] = sort[j].slice(1)
                }
            }
            //set minus operator for selected table header
            sort[i] = '-' + sort[i]
        }
    }


    return (
        <Row className='w-100'>
            <SideBar activeTab="order" />
            <Col>
                <main>
                    <Container className="py-5">
                        <h1 className="pb-5">Orders</h1>
                        { /*show loader if loading */
                        loading ? <Loader />
                            /*else if an error occured, display error message */
                            : error ? <Message variant="danger">{error}</Message>
                            /*else show page content */
                            : ( <>
                                
                                <Table striped bordered responsive className="table-sm">
                                    <thead>
                                        <tr>
                                            {tableTitle.map((title, index) => (
                                                <th key={index} 
                                                    className={`table-sort-header
                                                        ${(('-'+ordering) === sort[index] 
                                                        || ordering === ('-'+sort[index])) 
                                                        && "active"}`}>
                                                    <Button onClick={()=>orderingHandler(sort[index], index)} className="d-flex justify-content-between align-items-center">
                                                        {title}
                                                        {/* ascending or descending icon based on neg/positive value */}
                                                        {sort[index].substring(0,1) === '-' ?  <HiSortAscending/> : <HiSortDescending/> }
                                                    </Button>     
                                                </th>
                                            ))}
                                            <th></th>
                                        </tr>                            
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.user && (order.user.first_name + ' ' + order.user.last_name)}</td>
                                                <td>{order.orderDate.substring(0,10)}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.orderStatus}</td> 
                                                <td><LinkContainer to={`/admin/order/${order._id}`}>
                                                        <Button variant="outline-success"   className="">Details</Button>
                                                    </LinkContainer></td>  
                                            </tr>
                                        ))}
                                        
                                    </tbody>

                                </Table>
                                <Paginate path={path} page={page} pages={pages} />
                                </>
                            )}
                        
                    </Container>
                    
                </main>

            </Col>
            
            
        </Row>
    )
}

export default OrderListScreen
