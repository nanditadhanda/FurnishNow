import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { Container, Row, Col, ListGroup, Image, Button, Card} from 'react-bootstrap'
import { IoTrashSharp } from 'react-icons/io5'

import {addToCart, removeFromCart} from '../actions/cartActions'

//custom components
import Message from '../components/Message'
import Quantity from '../components/Quantity'


function CartScreen({ match, location, history }) {

    //-----------Authentications and page access control -------------//

    //check login state to see if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    //destructure login state
    const {userInfo} = userLogin

    
    //dispatch action - action will update the state and add the items into local storage
    const dispatch = useDispatch()

    //pull cart data from state
    const cart = useSelector(state => state.cart)

    //destructure cart
    const {cartItems} = cart     

    
    //quantity update

    //FIX THIS *****  
    const updateQty = (qtyUpdate) => {         
        
        const initialQty =  qtyUpdate.initQty
        const updateQty = qtyUpdate.qty

        if( updateQty !== initialQty){
            const {cartItems} = cart   
        } 
    }

    let shippingFee = 0.00

    if(cartItems.length > 0){
        shippingFee = 25.00
    }


    //Remove Item from cart

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    
    //check out handler
    const checkoutHandler = () => {
        //redirect user to login page if not logged in. if user is logged in, redirect to shipping page
        history.push('/login?redirect=shipping')
    }

    useEffect(() => {
        //prevent store manager or system admin from accessing this page
        if(userInfo && (userInfo.isStoreManager || userInfo.isSystemAdmin)){
            history.push(`/accessdenied`)
        }
    })

    return (
        <Container className="py-5">
            {/* //Page Heading */}
            <Row>
                <Col>
                    <h1>Shopping Cart</h1>
                </Col>
            </Row>
            
            <Row className="py-3">
                <Col md={8} xs={12}>
                    {/* //cart items */}

                    {/* If there are no items in cart */}
                    {cartItems.length === 0 ? (
                        <Message>
                            There are no items in the cart <Link to="/">Go To Home</Link>
                        </Message>
                    ) 
                    // Else if there are items found in cart: 
                    : 
                    (
                        <ListGroup variant="flush">
                            {/* populate cart items */}
                            {cartItems.map(item => (
                                //product id as key
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        
                                        {/* product image */}
                                        <Col md={2} xs={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        {/* product name */}
                                        <Col md={10} xs={9}>
                                            <Row>
                                                <Col md={5} sm={8} >
                                                    <Link to={`/product/${item.category_slug}/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={3} sm={4} >
                                                    RM {item.price}
                                                </Col>
                                                <Col lg={3} md={4} xs={9} sm={8}>                                      
                                                    <Quantity  prodQuantity={updateQty} 
                                                            max={item.countInStock} 
                                                            productID={item.product} 
                                                            initQty={item.qty}
                                                            min={1}
                                                            cartPage="true"/>
                                                    {/*Number of items available */}
                                                </Col>
                                                <Col md={1} xs={2}>
                                                    <Button type="button" className="btn-icon" variant="outline" onClick={() => removeFromCartHandler(item.product)}><IoTrashSharp className="text-success" style={{verticalAlign: "top"}}/></Button>
                                                </Col>
                                                    </Row>
                                                </Col>
                                        
                                    </Row>

                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                    )}
                </Col>
                <Col md={4}  xs={12}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item><h4>Order Summary</h4></ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="py-1">
                                    <Col md={4}>Total Items:</Col>
                                    <Col className="text-right">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Col>
                                </Row>
                                 <Row className="py-1">
                                    <Col md={4}>Subtotal:</Col>
                                    <Col className="text-right">
                                        <strong>
                                             RM {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row className="py-1">
                                    <Col>
                                        <div className="d-grid">
                                            <Button disabled={cartItems.length === 0} onClick={checkoutHandler} className="mt-2 btn-primary" type='button'>Checkout</Button>          
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CartScreen
