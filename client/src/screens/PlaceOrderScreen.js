import React, {useState, useEffect} from 'react'

//routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import action
//import { saveShippingAddress } from '../actions/cartActions'

//UI components
import { Row, Col, Button, ListGroup, Image, Card} from 'react-bootstrap'
import {MdEdit} from 'react-icons/md'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = ({history}) => {
    
    //check login state to see if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    //destructure login state
    const {userInfo} = userLogin

    //select cart state
    const cart = useSelector(state => state.cart)
    //destructure state and extract shippingAddress
    const { cartItems, shippingAddress, paymentMethod } = cart

    console.log(paymentMethod)

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

        //if cart not empty and if payment method not selected, redirect to payment page
        if(cartItems.length > 0 && shippingAddress.address && !paymentMethod){
            history.push('/payment')
        }
    }, [history, userInfo, cartItems, shippingAddress, paymentMethod])


    //----------dynamic cart values--------

    //subtotal price
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    //Shipping price - if total price is more than $250, set shipping to free.
    cart.shippingPrice = (cart.itemsPrice > 250 ? 0 : 50).toFixed(2)
    //SST
    cart.taxPrice = (Number(cart.itemsPrice * 0.06)).toFixed(2)

    //total price
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    //place order function
    const placeOrder = () => {
        console.log("place order")
    }
    return (
        <section>
            {/* Checkout Steps */}
            <CheckoutSteps step1 step2 step3 step4/>
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
                                    <strong>Shipping: </strong>
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
                    
                        {/* Payment Details */}
                        <ListGroup.Item className="py-3">
                            <h3 className="mb-4">Payment Method</h3>
                            <Row>
                                <Col xs={10} md={11}>
                                    <p className="lh-base">
                                        <strong>Method: </strong>
                                        {cart.paymentMethod}
                                    </p>
                                </Col>
                                 {/* Edit Button */}
                                <Col  xs={2} md={1}>
                                    <Link to="/payment">
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
                                    <Col className="text-right">${cart.itemsPrice}</Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={4}>Shipping:</Col>
                                    <Col className="text-right">${cart.shippingPrice}</Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={4}>Tax (SST - 6%):</Col>
                                    <Col className="text-right">${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                             <ListGroup.Item>
                                <Row className="py-1">
                                    <Col md={4}><h6>Grand Total:</h6></Col>
                                    <Col className="text-right"><h6>${cart.totalPrice}</h6></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button 
                                        type="button" 
                                        className="btn-block"
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrder}>
                                        Place Order
                                    </Button>
                                </div>
                                
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </section>
    )
}

export default PlaceOrderScreen
