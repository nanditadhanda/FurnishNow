import React, { useState, useEffect} from 'react'

//routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import action
import { getOrderDetails, payOrder, updateOrderStatus } from '../actions/orderActions'
//import constants
import { ORDER_PAYMENT_RESET, ORDER_STATUS_RESET } from '../constants/orderConstants'

//payment buttons
import { PayPalButton} from 'react-paypal-button-v2'

//UI components
import { Row, Col, ListGroup, Image, Card, Form} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Button from '@restart/ui/esm/Button'





//Order Screen Function
    //match with the id passed in
const OrderScreen = ({ match , history }) => {
    //set states
    const [status, setStatus] = useState('')
    
    //-----------Retrieve order details --------------//

    //get order by ID
    const orderID = match.params.id
    //set dispatch
    const dispatch = useDispatch()

    // orderDetails state
    const orderDetails = useSelector(state => state.orderDetails)
    //destructure state
    const {order, error, loading} = orderDetails

    //if not loading and there's no error
    if(!loading && !error){
        //subtotal item price
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2) 
    }

    //-----------Authentications and page access control -------------//

    //check login state to see if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    //destructure login state
    const {userInfo} = userLogin

    //conditions to check to allow user to access place order screen
    useEffect(() => {
       
        //if user is not logged in, display login page    
        if(!userInfo){
            history.push(`/login?redirect=order/${orderID}`)
        }
       
    }, [history, userInfo, orderID])

    //-------------- Payment ----------------//

    // orderDetails state
    const orderPayment = useSelector(state => state.orderPayment)
    //destructure state
    const {loading: loadingPayment, success: successPayment} = orderPayment
    
    //sdk state
    const [sdkReady, setSdkReady] = useState(false)

    //PayPal Script
    const addPayPalScript = () => {
        //client ID: Abz14EA_LsKtie3zGyRmoIbYd41Bebt5Fd9xJxOSQWenL3kT_7bb1eXZqZe-_RrZjAqiTgMP7F4hgbOX
        
        //create custom script element 
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=Abz14EA_LsKtie3zGyRmoIbYd41Bebt5Fd9xJxOSQWenL3kT_7bb1eXZqZe-_RrZjAqiTgMP7F4hgbOX'
        script.async = true
        //once script is loaded, set sdkReady to true
        script.onload = () =>{
            setSdkReady(true)
        }
        //once sdk is ready, append script to body of app
        document.body.appendChild(script)
    }

    //--------------Order Status-------------------//

    // orderDetails state
    const orderStatus = useSelector(state => state.orderStatus)
    //destructure state
    const {loading: loadingStatus, error:errorStatus, success: successStatus, successMessage: updateSuccessMsg} = orderStatus
    

    //--------------- Launch Use Effect ---------------//

    //use effect to get order details
    useEffect(() => {
        //if order details not found in state or if order ID match order ID in backend, send dispatch to retrieve order data
        if(!order || order._id !== Number(orderID) || successPayment || successStatus ){
            //if payment is made, reset state
            dispatch({type: ORDER_PAYMENT_RESET})
            
            //if order status is updated, reset state
            dispatch({type: ORDER_STATUS_RESET})

            //dispatch to get order details of specific order
            dispatch(getOrderDetails(orderID))  
            
            
        }   
        else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }
            else{
                setSdkReady(true)
            }
        }   
    }, [dispatch,order, orderID, successPayment, successStatus])

    //payment handler on successful payment
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderID, paymentResult))
    }

    const changeStatus = (e) => {
        const value = e.target.value        
        setStatus(value)
    }

    //update orderStatus handler
    const orderStatusHandler = () => {

        order.orderStatus = status
        dispatch(updateOrderStatus(order))
        console.log(order.orderStatus)
    }


    return loading ? (
        // if order details loading, show loader
        <Loader />
        ) : error ? (
            //else if error received, display error message
            <Message variant="danger">{ error }</Message>
        ) : (
            //else display order details
            <section>   
                <Row>
                    <Col md={8} lg={7}>
                        {/* Shipping */}
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="py-3"> 
                                <h3>Order: #{order._id}</h3>
                                <p>{order.orderDate}</p>
                                <strong>Order Status:</strong>
                                 <p>{order.orderStatus}</p>
                                <strong>Last Updated:</strong>
                                <p>{order.lastUpdatedAt.substring(0,10)}</p>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-3">
                                {/* Heading */}
                                
                                <h4 className="mb-4">Shipping Details</h4>
                                <Row>
                                    <Col xs={10} md={11}>
                                        {/* Shipping Info */}
                                        <p className="">
                                            <strong>Name: </strong>
                                            {order.user.first_name}&nbsp;{order.user.last_name}
                                        </p>
                                        <p className="">
                                            <strong>Phone Number: </strong>
                                            {order.user.phone}
                                        </p>
                                        <p className="">
                                            <strong>Address: </strong>
                                            {order.shippingAddress.address}, 
                                            {' '}
                                            {order.shippingAddress.city} {order.shippingAddress.zipCode}, 
                                            {' '}
                                            {order.shippingAddress.state}, 
                                            {' '}
                                            {order.shippingAddress.country}
                                        </p>
                                    </Col>
                                   
                                </Row>
                                
                            </ListGroup.Item>

                            {/* Order Items */}
                            <ListGroup.Item className="py-3">
                                <Row>
                                    <Col xs={10} md={11}>
                                        <h4 className="mb-4">Order Items</h4>
                                    </Col>
                                </Row> 
                                <ListGroup variant="flush">
                                    {/* Map out items in order */}
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key="index">
                                            <Row>
                                                {/* Product Image */}
                                                <Col md={2} xs={3}>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                {/* Product Name */}
                                                <Col><Link to={`/product/${item.category_slug}/${item.product}`}>{item.name}</Link></Col>
                                                {/* Quantity and Price */}
                                                <Col md={4}>{item.qty} x ${item.price}&nbsp;&nbsp;=&nbsp;&nbsp; ${(parseFloat(item.qty * item.price)).toFixed(2)}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </ListGroup.Item>
                        
                        </ListGroup>

                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>Order Summary</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="py-1">
                                        <Col md={4}>Subtotal:</Col>
                                        <Col className="text-right">${order.itemsPrice}</Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col >Shipping:</Col>
                                        <Col className="text-right">${order.shippingPrice}</Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col >Tax (SST - 6%):</Col>
                                        <Col className="text-right">${order.taxRate}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="py-1">
                                        <Col ><strong>Grand Total:</strong></Col>
                                        <Col className="text-right"><strong>${order.totalPrice}</strong></Col>
                                    </Row>
                                </ListGroup.Item>  
                                <ListGroup.Item>
                                    <Row className="py-1">
                                        <Col >Payment Method:</Col>
                                        <Col className="text-right">{order.paymentMethod}</Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={4}>Payment Status:</Col>
                                        <Col className="text-right">
                                            {order.isPaid ? 
                                                <p className="text-success">Paid on {order.paymentDate}</p>
                                                : <p className="text-danger">Not Paid</p>}
                                            </Col>
                                    </Row>
                                </ListGroup.Item> 
                                {/*------ Paypal Payment Integration (Not for admin user)----- */}
                                {!order.isPaid && !userInfo.isSystemAdmin && !userInfo.isStoreManager (
                                    <ListGroup.Item>
                                        {loadingPayment && <Loader />}
                                        {!sdkReady ? (
                                            <Loader/>
                                        ) : (
                                            <PayPalButton 
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />   
                                        )}
                                    </ListGroup.Item>   
                                )}

                                {/* Update Order Status - Admin and Store Manager */}
                                {order.isPaid 
                                    && (userInfo.isAdmin || userInfo.isStoreManager) 
                                    && (
                                        !order.isDelivered ? (
                                            <ListGroup.Item>
                                                {loadingStatus && <Loader />}
                                                {errorStatus && <Message variant="danger">{errorStatus}</Message>}
                                                
                                                <Form>
                                                    <Form.Select aria-label="Order Status" defaultValue={order.orderStatus} onChange={changeStatus}>
                                                        <option>Order Status</option>
                                                        <option value="Placed">Placed</option>
                                                        <option value="Packaged">Packaged</option>
                                                        <option value="Shipped">Shipped Out</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </Form.Select>
                                                    <div className="d-grid my-3">
                                                        <Button type="button" className="btn-primary btn" onClick={orderStatusHandler}>Update Order Status</Button>
                                                    </div>
                                                </Form>
                                            </ListGroup.Item>   
                                        )
                                        : (
                                            <ListGroup.Item> 
                                                <Message variant="success" >Order Completed</Message>
                                            </ListGroup.Item>
                                        )

                                        )}
                                    
                                
                                                       
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </section>
        )
}

export default OrderScreen
