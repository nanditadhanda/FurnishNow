import React, {useState, useEffect} from 'react'

//stripe componetns
import {CardElement, useStripe, useElements, PaymentElement, FpxBankElement} from '@stripe/react-stripe-js';

//UI elements
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'

//import redux
import { useDispatch, useSelector } from 'react-redux';

//payment action
import { saveStripeInfo } from '../actions/orderActions';


const CheckoutForm = ({amount, method}) => {

    //set dispatch
    const dispatch = useDispatch()

    //state local states
    const [error, setError] = useState('')
    const [email, setEmail] = useState('');

    const stripe = useStripe()
    const elements = useElements()

    //payment state
    const orderPayment = useSelector(state => state.orderPayment)
    const { success : successPayment, error: errorPayment, loading: loadingPayment} = orderPayment

    

    //------------stripe----------//
    // Handle real-time validation errors from the CardElement.
    const handleChange = (e) => {
        if (e.error) {
            setError("Error: " +e.error.message);
        } else {
            setError('');
        }
    }

    const handleSubmit = async (e) => {
        //prevent default submission and page refresh
        e.preventDefault();

        //get stripe card element
        const card = elements.getElement(CardElement);

        //stripe payment api
        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        })

        if(!error){
            //dispatch payment info to backend
            dispatch(saveStripeInfo({
                email,
                payment_method_id: paymentMethod.id,
                amount
            }))
        }
        
    }
    return (
        <Form onSubmit={handleSubmit} className="stripe-form">
            {/* display error message */}
            {(error || errorPayment) && <Message variant="danger">{error ? error : errorPayment}</Message>}          
            
            {method === 'card' && (
                <>
                    <Row >
                        <Col>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    value={email}
                                    onChange={(event) => { setEmail(event.target.value)}}
                                    required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Form.Group className="mb-3" controlId="card-element">
                                <Form.Label>Credit or Debit card</Form.Label>
                                <CardElement id="card-element" onChange={handleChange}/>
                            </Form.Group>                            
                        </Col>
                    </Row>
                </>

            )}
            
            <div className="d-grid">
                <Button type="submit" variant="primary">
                    Submit Payment
                </Button>
            </div>
            
            
        </Form>
    )
}

export default CheckoutForm
