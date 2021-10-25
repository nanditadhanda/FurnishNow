import React, {useEffect} from 'react'

//Routing
import { LinkContainer } from 'react-router-bootstrap'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import user details action
import { myOrdersList } from '../actions/orderActions'


//UI components
import {Row, Col, Card, Table, ListGroup, Button, Image} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const MyOrderListScreen = ({history}) => {

     //-----------Authentications and page access control -------------//

    //check login state to see if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    //destructure login state
    const {userInfo} = userLogin

    //set dispatch
    const dispatch = useDispatch()

    //conditions to check to allow user to access place order screen
    useEffect(() => {
       
        //if user is not logged in, display login page    
        if(!userInfo){
            history.push(`/login?redirect=my-orders`)
        }
        else{
             //get order list
            dispatch(myOrdersList())  
        }
       
    }, [history, userInfo, dispatch])

    //------------------------ Get Order List -------------------- //
    
   

    //get order list state
    const myOrders = useSelector(state => state.myOrders)
    //destructure state
    const {loading, error, orders} = myOrders


    return (
        <Row>
            <Col>
                <h2 className="pb-4">My Orders</h2>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">Error: {error}</Message>
                ) : (
                    orders.reverse().map(order => (
                        <Card key={order._id} className="my-4 shadow-sm"> 
                            <Card.Header className="d-flex justify-content-between">
                                <small className="">Order ID: {order._id}</small>   
                                <small>Status: <span className="text-success">Order {order.orderStatus}</span></small>
                            </Card.Header>

                            <Row>
                                <Col className="">
                                    <ListGroup variant="flush" className="pe-1 ps-2 py-2">
                                        <ListGroup.Item>
                                            <h6>Order Items: </h6>
                                        </ListGroup.Item>
                                    {/* Map out items in order */}
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key="index">
                                            <Row>
                                                {/* Product Image */}
                                                <Col md={2} xs={3}>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                {/* Product Name */}
                                                <Col>
                                                    {item.name}
                                                    <br/>    
                                                    <span className="text-secondary">{item.qty} x RM {item.price}</span>
                                                </Col>
                                                {/* Quantity and Price */}
                                                <Col md={4} className="text-success text-right">
                                                   RM {(parseFloat(item.qty * item.price)).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                </Col>

                                 <Col md={4} className="border-start px-5 py-3">
                                    <Table>
                                        <tr>
                                            <td><h6 className="p-0">Order Date:</h6></td>
                                            <td className="text-right">{order.orderDate.substring(0, 10)}</td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="p-0"> Order Total:</h6></td>
                                            <td className="text-right">RM {order.totalPrice}</td>
                                        </tr>
                                        <tr >
                                            <td colSpan="2">
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <div className="d-grid px-0 my-3">
                                                        <Button variant="outline-success"  type='button'>View Order</Button>
                                                    </div>
                                                </LinkContainer>
                                                
                                            </td>
                                        </tr>
                                    </Table>
                                </Col>
                                
                            </Row>      
                            <tr >
                                
                                
                                
                            </tr>
                        </Card>
                        
                    ))
                )}
            </Col>
        </Row>   )
}


export default MyOrderListScreen
