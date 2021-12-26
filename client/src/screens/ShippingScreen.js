import React, {useState, useEffect} from 'react'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import shippingAddress action
import { saveShippingAddress } from '../actions/cartActions'

//UI components
import {Container, Form, Row, Col, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const ShippingScreen = ({history}) => {

    //check login state to see if user is already logged in
    const userLogin = useSelector(state => state.userLogin)

    //destructure the state
    const {userInfo} = userLogin

    //select cart state
    const cart = useSelector(state => state.cart)
    //destructure state and extract shippingAddress
    const { cartItems, shippingAddress } = cart

    //check if user is already logged in
    useEffect(() => {
        //if cart is empty, redirect to cart page
        if(cartItems.length === 0){
            history.push('/cart')
        }
        //if user is not logged in, display login page    
        if(!userInfo && cartItems.length > 0){
            history.push('/login?redirect=shipping')
        }
    }, [history, userInfo, cartItems])

    //set dispatch
    const dispatch = useDispatch()

    //set states
    const [name, setName] = useState(shippingAddress.name)
    const [phone, setPhone] = useState(shippingAddress.phone)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
    const [country, setCountry] = useState(shippingAddress.country)

    //error state
    const [message, setMessage] = useState('')

    //submit handler
    const submitHandler = (e) => {
        //prevent default page redirect
        e.preventDefault()

         if(name === '' || phone === '' || address === '' || city === '' || state === '' || zipCode === '' || country === ''){
            setMessage('Please fill out all fields')
        }
        //phone regex validation
        else if(!/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i.test(phone)){
            setMessage("Invalid phone entered")
        }
        else{
             //dispatch to save shipping address
            dispatch(saveShippingAddress({name, phone, address, city, state, zipCode, country}))

            //redirect to payment page
            history.push('/placeorder')
        }    
    }


    return (
        <Container className="py-5">

            <FormContainer  bg="white" border="border" px="0" >
                {/* Checkout Steps */}
                <CheckoutSteps step1 step2/>

                <h2 className="my-4 text-center px-3">Shipping</h2>

                {message && <Message variant='danger' className="mb-3 mx-3">{message}</Message>}
                
                <Form onSubmit={submitHandler} className="px-3">
                    <h6 className="text-success py-3">Recepient Information</h6>       
                    <Row>
                        <Col md="6" xs="12">
                            {/* City Field */}
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    value={name ? name : ''} onChange={(e) => setName(e.target.value)}/>
                            </Form.Group>      
                        </Col>
                        <Col md="6" xs="12">
                            {/* Phone Field */}
                            <Form.Group controlId="phone" className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    value={phone ? phone : ''} onChange={(e) => setPhone(e.target.value)}/>
                            </Form.Group>      
                        </Col>
                    </Row>
                    <hr />
                    <h6 className="text-success py-3">Shipping Information</h6>
                    <Row>
                        <Col xs="12" >
                            {/* Address Field */}
                            <Form.Group controlId="address" className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    required 
                                    as="textarea" 
                                    value={address ? address : ''} onChange={(e) => setAddress(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6" xs="12">
                            {/* City Field */}
                            <Form.Group controlId="city" className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    value={city ? city : ''} onChange={(e) => setCity(e.target.value)}/>
                            </Form.Group>      
                        </Col>
                        <Col md="6" xs="12">
                            {/* State Field */}
                            <Form.Group controlId="state" className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    value={state ? state : ''} onChange={(e) => setState(e.target.value)}/>
                            </Form.Group>      
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6" xs="12">
                            {/* Zip Field */}
                            <Form.Group controlId="zipCode" className="mb-3">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    value={zipCode ? zipCode : ''} onChange={(e) => setZipCode(e.target.value)}/>
                            </Form.Group>      
                        </Col>
                        <Col md="6" xs="12">
                            {/*Country  Field */}
                            <Form.Group controlId="country" className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    required 
                                    type="text" 
                                    value={country ? country : ''} onChange={(e) => setCountry(e.target.value)}/>
                            </Form.Group>      
                        </Col>
                    </Row>
                    
                    {/* Submit Button */}
                    <div className="d-grid">
                        <Button type="submit" variant="primary" className="my-3">Continue</Button>
                    </div>  
                </Form>
                
            </FormContainer>
        </Container>
    )
}

export default ShippingScreen
