import React, {useState, useEffect} from 'react'

//routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import action
import { createOrder } from '../actions/orderActions'
//Import constant
import { ORDER_CREATE_RESET , ORDER_PAYMENT_RESET} from '../constants/orderConstants'

//UI components
import {Container, Row, Col, Form, Button, ListGroup, Image, Card} from 'react-bootstrap'
import {MdEdit} from 'react-icons/md'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

//paypal
import Paypal from '../components/Paypal'


//---------- STRIPE PAYMENT COMPONENTS -------------//
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from "@stripe/stripe-js/pure"
import CheckoutForm from "../components/CheckoutForm"
import Loader from '../components/Loader'

//dev-based publishable key
const stripePromise = loadStripe('pk_test_51JouiJFWKt2oGMYrbH8o342vopUMr6GOLRwDT6BJNKgimEMj8zUH2tyyik8goKyNcoW1sWk0q0G8vY57faN3TNVD00uewso2Ax');


const PlaceOrderScreen = ({history}) => {
    
    //-----------Authentications and page access control -------------//

    //check login state to see if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    //destructure login state
    const {userInfo} = userLogin

    //select cart state
    const cart = useSelector(state => state.cart)
    //destructure state and extract shippingAddress
    const { cartItems, shippingAddress } = cart

    //conditions to check to allow user to access place order screen
    useEffect(() => {
        //if cart is empty, redirect to cart page
        if(cartItems.length === 0){
            history.push('/cart')
        }
        //if user is not logged in, display login page    
        if(!userInfo && cartItems.length > 0){
            history.push('/login?redirect=placeorder')
        }

        //if cart not empty and if shipping address not provided, redirect to shipping page
        if(cartItems.length > 0 && !shippingAddress.address){
            history.push('/shipping')
        }

    }, [history, userInfo, cartItems, shippingAddress])


    //----------dynamic cart values--------//

    //subtotal price
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    //Shipping price - if total price is more than $250, set shipping to free.
    cart.shippingPrice = (cart.itemsPrice > 250 ? 0 : 20).toFixed(2)
    //SST
    cart.taxRate = (Number(cart.itemsPrice * 0.06)).toFixed(2)

    //total price
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxRate)).toFixed(2)


    //---------- Payment-----------------//

    //set states
    const [paymentMethod, setPaymentMethod] = useState('card')

    //-----------Placing an order --------------//

    const orderPayment = useSelector(state => state.orderPayment)

    const {error: errorPayment, loading: loadingPayment, paymentStatus} = orderPayment

    // orderCreate state
    const orderCreate = useSelector(state => state.orderCreate)
    //destructure state
    const {order, error: orderError, success:orderSuccess, loading:orderLoading} = orderCreate

    //set dispatch
    const dispatch = useDispatch()
    
    
    

    //use effect
    useEffect(() => {

        if(paymentStatus){
        //place order if payment is successfull
        if(paymentStatus.status === 'succeeded')
            dispatch(createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice : cart.shippingPrice,
                taxRate: cart.taxRate,
                totalPrice: cart.totalPrice,
            }))
        }
        if(orderSuccess){
            history.push(`/order/${order._id}`)
            //reset orderCreate state once order has been created
            dispatch({
                type: ORDER_CREATE_RESET,
            })

            //reset payment status
            dispatch({
                type: ORDER_PAYMENT_RESET,
            })
        }
    }, [dispatch, orderSuccess, history, order, orderPayment, cart, paymentStatus, paymentMethod])

    return (
        <section className="py-5    ">
            {/* Checkout Steps */}
            <CheckoutSteps step1 step2 step3 step4/>

            <Container >
                {orderLoading && <Loader />}
                 {orderError && <Message variant="danger">Failed to place order. {orderError}</Message>}
                <Row>
                    <Col md={8} lg={7}>
                        {/* Shipping */}
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="py-3">
                                {/* Heading */}
                                
                                <h3 className="mb-4">Shipping</h3>
                                <Row>
                                    <Col xs={10} md={11}>
                                        {/* Shipping Info */}
                                        <p className="lh-base">
                                        <strong>Recepient Name: </strong>
                                        {cart.shippingAddress.name} 
                                        </p>
                                        <p className="lh-base">
                                        <strong>Contact Number: </strong>
                                        {cart.shippingAddress.phone} 
                                        </p>
                                        <p className="lh-base">
                                        <strong>Shipping Address: </strong>
                                        {cart.shippingAddress.address}, 
                                        {' '}
                                        {cart.shippingAddress.city} {cart.shippingAddress.zipCode}, 
                                        {' '}
                                        {cart.shippingAddress.state}, 
                                        {' '}
                                        {cart.shippingAddress.country}
                                    </p>
                                    </Col>
                                    {/* Edit Button */}
                                    <Col xs={2} md={1}>
                                        <Link to="/shipping">
                                            <Button variant="outline-secondary"  className="btn-icon"><MdEdit/></Button>
                                        </Link>
                                    </Col>
                                </Row>
                                
                            </ListGroup.Item>

                            {/* Order Items */}
                            <ListGroup.Item className="py-3">
                                <Row>
                                    <Col xs={10} md={11}>
                                        <h3 className="mb-4">Order Items</h3>
                                    </Col>
                                    {/* Edit Button */}
                                    <Col  xs={2} md={1}>
                                        <Link to="/cart">
                                            <Button variant="outline-secondary"  className="btn-icon"><MdEdit/></Button>
                                        </Link>
                                    </Col>
                                </Row>
                                
                                
                                <ListGroup variant="flush">
                                    {/* Map out items in cart */}
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key="index">
                                            <Row>
                                                {/* Product Image */}
                                                <Col md={1} xs={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                {/* Product Name */}
                                                <Col><Link to={`/product/${item.category_slug}/${item.product}`}>{item.name}</Link></Col>
                                                {/* Quantity and Price */}
                                                <Col md={4}>{item.qty} x RM {item.price}&nbsp;&nbsp;=&nbsp;&nbsp; RM{(parseFloat(item.qty * item.price)).toFixed(2)}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </ListGroup.Item>
                        
                        </ListGroup>

                    </Col>
                    <Col md={4} lg={{span: 4 , offset:1}}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>Order Summary</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="py-1">
                                        <Col md={4}>Subtotal:</Col>
                                        <Col className="text-right">RM {cart.itemsPrice}</Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={4}>Shipping:</Col>
                                        <Col className="text-right">RM {cart.shippingPrice}</Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={4}>Tax (SST - 6%):</Col>
                                        <Col className="text-right">RM {cart.taxRate}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="py-1">
                                        <Col md={4}><h6>Grand Total:</h6></Col>
                                        <Col className="text-right"><h6>RM {cart.totalPrice}</h6></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h5>Payment</h5>
                                     {( paymentStatus && paymentStatus.status === 'succeeded') && (
                                    
                                        <Message variant="success">Payment Successfully Processed</Message>
                                    
                                )}
                                {( paymentStatus && paymentStatus.status === 'requires_action') && (
                                    
                                        <Message variant="danger">Payment could not be processed. Please refresh the browser window and try again after a few minutes</Message>
                                   
                                )}
                                    <Form>      
                                        <Form.Group>
                                            <Form.Check 
                                                type='radio' 
                                                label ='Credit/Debit Card'
                                                id='card' 
                                                name ='paymentMethod'
                                                value='card'
                                                defaultChecked
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <Form.Check 
                                                type='radio' 
                                                label ='Grabpay'
                                                id='grabwallet' 
                                                name ='paymentMethod'
                                                value='grabwallet'
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <Form.Check 
                                                type='radio' 
                                                label ='FPX'
                                                id='fpx' 
                                                name ='paymentMethod'
                                                value='fpx'
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <Form.Check 
                                                type='radio' 
                                                label ='PayPal'
                                                id='paypal' 
                                                name ='paymentMethod'
                                                value='paypal'
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                        </Form.Group>
                                        
                                    </Form>
                                </ListGroup.Item>


                                <ListGroup.Item>

                                    {loadingPayment ? 
                                    // if payment is loading, show loader
                                        (<><Loader/> 
                                            <p className="text-danger">Processing Payment...</p>
                                        </>
                                        )
                                        :
                                    //else show checkout form
                                        paymentMethod !== 'paypal' ? (
                                            <Elements stripe={stripePromise}>
                                                <CheckoutForm amount={cart.totalPrice} method={paymentMethod}/>
                                            </Elements>
                                        )
                                        :
                                         <Paypal/>
                                        
                                    }
                                    {/* <div className="d-grid">
                                        <Button 
                                            type="button" 
                                            className="btn-block"
                                            disabled={cart.cartItems === 0}
                                            onClick={placeOrder}>
                                            Place Order
                                        </Button>
                                    </div> */}
                                    
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default PlaceOrderScreen
