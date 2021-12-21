import React, {useState, useEffect} from 'react'

//routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'

//import actions
import { createOrder } from '../actions/orderActions'

//Import constant
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { PAYMENT_CREATE_RESET, PAYMENT_UPDATE_RESET } from '../constants/paymentConstants'
import {CART_CLEAR_ITEMS} from '../constants/cartConstants'

//Import constant

//UI components
import {Container, Row, Col, Button, ListGroup, Image, Card} from 'react-bootstrap'
import {MdEdit} from 'react-icons/md'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'



//---------- STRIPE PAYMENT COMPONENTS -------------//
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from "@stripe/stripe-js/pure"
import Checkout from "../components/Checkout"

//dev-based publishable key
const stripePromise = loadStripe('pk_test_51JouiJFWKt2oGMYrbH8o342vopUMr6GOLRwDT6BJNKgimEMj8zUH2tyyik8goKyNcoW1sWk0q0G8vY57faN3TNVD00uewso2Ax');

const PlaceOrderScreen = ({history, location}) => {

    
    const [params, setParams] = useState('')
    const [redirect, setRedirect] = useState(false)

    
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

       //check if the URL sends back the payment intent and client secret key
        const queryString = require('query-string');

        if(location.search){
            const parsed = queryString.parse(location.search);
            setParams(parsed)
            setRedirect(true)
        }
        

    }, [history, userInfo, cartItems, shippingAddress, location.search])


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
    const [amount, setAmount] = useState(0)
    let [clientSecret, setClientSecret] = useState('')
    let [paymentID, setPaymentID] = useState('')

    //-----------Paying for an order --------------//

    
    //set dispatch
    const dispatch = useDispatch()
    
    const [loading, setLoading] = useState(true)
    

    useEffect(()=> {
        if(cart.totalPrice > 0) {
            setAmount(cart.totalPrice )
        }

        if(redirect ){
            setClientSecret(params.payment_intent_client_secret)   
        }else{
            //if total amount is set and clientsecret is not loaded
            if(amount !== 0 && clientSecret === ''){
                // Create PaymentIntent as soon as the page loads
                fetch("/api/payment/create-payment-intent/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 'amount' : amount,
                                        'email' : userInfo.email }),
                })
                .then((res) => res.json())
                .then((data) => {setClientSecret(data.clientSecret); setPaymentID(data.id)});
            }
        }
        if(clientSecret !== ''){
            setLoading(false)
        }

    }, [cart.totalPrice, amount, clientSecret, userInfo.email, redirect, params])
    //use effect

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    //place order once payment is successful

    
    const paymentUpdate = useSelector(state => state.paymentUpdate)
    const {info:paymentInfo} = paymentUpdate

    // orderCreate state
    const orderCreate = useSelector(state => state.orderCreate)
    //destructure state
    const {order, error: orderError, success:orderSuccess, loading:orderLoading} = orderCreate


    useEffect(() => {
        if(orderSuccess){

            //reset payment status
            dispatch({
                type: PAYMENT_CREATE_RESET,
            })
            dispatch({
                type: PAYMENT_UPDATE_RESET,
            })

            //clear cart once order is created successfully
            dispatch({
                type: CART_CLEAR_ITEMS,
            })   
            //remove from local storage
            localStorage.removeItem('cartItems')

            //reset orderCreate state once order has been created
            let orderID = order._id

            dispatch({type: ORDER_CREATE_RESET,})
                
            history.push(`/order/${orderID}`)
    
        }
        
        if(paymentInfo && !order){
            //place order if payment is successfull
            if(paymentInfo.status === 'succeeded'){
                dispatch(createOrder({
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    payment: paymentInfo._id,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice : cart.shippingPrice,
                    taxRate: cart.taxRate,
                    totalPrice: cart.totalPrice,
                }))
            }
        }
       
    }, [dispatch, orderSuccess, history, order, paymentInfo, cart])

    
    return (
        <section className="py-5    ">
            {/* Checkout Steps */}
            <CheckoutSteps step1 step2 step3 step4/>

            {orderError && <Message variant="danger">Error:{orderError}. Failed to place order</Message>}
            {orderLoading ?
            <>
                <Message variant="success">Payment has been received. Please sit tight while we place your order</Message>
                <Loader />
            </>
            :
                <Container >
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
                                                    <Col xl={1} lg={2} xs={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                    </Col>
                                                    {/* Product Name */}
                                                    <Col>
                                                        <Row>
                                                            <Col><Link to={`/product/${item.category_slug}/${item.product}`}>{item.name}</Link></Col>
                                                            {/* Quantity and Price */}
                                                            <Col md={12} lg={5}>{item.qty} x RM {item.price}&nbsp;&nbsp;=&nbsp;&nbsp; RM{(parseFloat(item.qty * item.price)).toFixed(2)}</Col>
                                                        </Row>                                                        
                                                    </Col>
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
                                    
                                        
                                        {clientSecret && !loading ?
                                            <Elements options={options} stripe={stripePromise}>
                                                <Checkout amount={amount} paymentID={paymentID} params={params} redirect={redirect}/>
                                            </Elements>
                                            :
                                            <Loader/>
                                        }
                                    </ListGroup.Item>

                                    
                                    
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            }
        </section>
    )
}

export default PlaceOrderScreen
