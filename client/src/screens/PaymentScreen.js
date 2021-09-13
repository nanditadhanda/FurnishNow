import React, {useState, useEffect} from 'react'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import shippingAddress action
import { savePaymentMethod } from '../actions/cartActions'

//UI components
import {Form, Row, Col, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({history}) => {
    //check login state to see if user is already logged in
    const userLogin = useSelector(state => state.userLogin)

    //destructure the state
    const {userInfo} = userLogin

    //select cart state
    const cart = useSelector(state => state.cart)
    //destructure state and extract shippingAddress
    const { cartItems, shippingAddress } = cart

    //set dispatch
    const dispatch = useDispatch()

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

        //if cart not empty and if shipping address not provided, redirect to shipping page
        if(cartItems.length > 0 && !shippingAddress.address){
        history.push('/shipping')
    }
    }, [history, userInfo, cartItems, shippingAddress])

    //set states
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    //submit handler
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    

    //return value
    return (
        <FormContainer bg="white" border="border" >
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

            <h2 className="my-4 text-center">Payment</h2>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Select Payment Method:</Form.Label> 
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label ='Paypal or Credit Card'
                            id='paypal' 
                            name ='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>

                     {/* Submit Button */}
                    <div className="d-grid">
                        <Button type="submit" variant="primary" className="mb-3 mt-4">Continue</Button>
                    </div> 

                </Form.Group>
            </Form>
            
        </FormContainer>
    )
}

export default PaymentScreen
