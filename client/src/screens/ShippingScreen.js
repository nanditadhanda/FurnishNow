import React, {useState, useEffect} from 'react'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import shippingAddress action
import { saveShippingAddress } from '../actions/cartActions'

//UI components
import {Form, Row, Col, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({history}) => {

    //select cart state
    const cart = useSelector(state => state.cart)
    //destructure state and extract shippingAddress
    const { shippingAddress } = cart

    //set dispatch
    const dispatch = useDispatch()

    //set states
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
    const [country, setCountry] = useState(shippingAddress.country)

    //submit handler
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, state, zipCode, country}))
        history.push('/payment')
    }


    return (
        <>

            <FormContainer  bg="white" border="border" >
                {/* Checkout Steps */}
                <CheckoutSteps step1 step2/>

                <h2 className="my-4 text-center">Shipping</h2>
                
                <Form onSubmit={submitHandler}>
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
                                <Form.Label>Zip</Form.Label>
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
        </>
    )
}

export default ShippingScreen
