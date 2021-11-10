import React, {useState, useEffect} from 'react'

//stripe componetns
import {CardElement, useStripe, useElements, PaymentElement, FpxBankElement} from '@stripe/react-stripe-js';

//import redux
import { useDispatch, useSelector } from 'react-redux';

//payment action
import { saveStripeInfo } from '../actions/orderActions';
import {savePaymentInfo} from '../actions/paymentActions'

//UI elements
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'

//return url 
let path = window.location.protocol + "//" + window.location.host


const CheckoutForm = ({amount, method, paymentID}) => {

    //set dispatch
    const dispatch = useDispatch()

    //state local states
    const [isError, setError] = useState(false)
    const [warning, setWarning] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const stripe = useStripe()
    const elements = useElements()

    //payment state
    const orderPayment = useSelector(state => state.orderPayment)
    const { success : successPayment, error: errorPayment, loading: loadingPayment} = orderPayment

    useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    console.log("client secret:" , clientSecret)

    if (!clientSecret) {
      return;
    }

    console.log("client secret2:" , clientSecret)

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
       console.log("intent:" , paymentIntent) 
      switch (paymentIntent.status) {
        case "succeeded":
            setMessage("Payment succeeded!")
            setError(false)
            setWarning(true)
            break;
        case "processing":
            setWarning(true)
            setError(false)
            setMessage("Your payment is processing.");
            break;
        case "requires_payment_method":
            setWarning(false)
            setError(true)
            setMessage("Your payment was not successful, please try again.");
            break;
        default:
            setWarning(false)
            setError(true)
            setMessage("Something went wrong. Please refresh your browser window and try again in a few minutes");
            break;
      }
    });
  }, [stripe]);

   

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

         if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            setError("Stripe or Stripe Elements have not loaded yet")
            return;
        }

        setLoading(true)

        const {error, paymentIntent, paymentMethod} = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: path+"/placeorder"
            },
        }).then((response) => {
            if (response.error) {
             // Handle error here
             setMessage(error.message)
            } else if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
                // Handle successful payment here
                setMessage("Success")
                console.log("success")
            }
        })

        

        

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }
        setLoading(false)

            

            if (error) {
                setMessage(error.message);
                setError(true)
                setWarning(false)
            }else{
                setError(false)
                dispatch(saveStripeInfo({
                    email,
                    payment_method_id: paymentMethod.id,
                    amount
                }))
            }           


        // switch(method){
        //     case "card":
        //         //get stripe card element
        //         const card = elements.getElement(CardElement);

        //         //stripe payment api
        //         const {paymentMethod, error , paymentIntent} = await stripe.createPaymentMethod({
        //             type: 'card',
        //             card: card
        //         })

        //         console.log("paymentIntent: ", paymentIntent)

        //         if(!error){
        //             //dispatch payment info to backend
        //             dispatch(saveStripeInfo({
        //                 email,
        //                 payment_method_id: paymentMethod.id,
        //                 amount
        //             }))
        //         }
        //         break;
            
        //     case "fpx":

        //         // let {error: stripeError, paymentIntent} = await stripe.confirmFpxPayment(
        //         // clientSecret,
        //         // {
        //         //     payment_method: {
        //         //     fpx: elements.getElement(FpxBankElement),
        //         //     },
        //         //     return_url: `${window.location.origin}/fpx?return=true`,
        //         // }
        //         // );

        //         // if (stripeError) {
        //         // // Show error to your customer (e.g., insufficient funds)
        //         // addMessage(stripeError.message);
        //         // return;
        //         // }

        //         break;
        //     default:
        //         break;

        // }
        
        
    }
    return (
        <Form onSubmit={handleSubmit} id="payment-form" className="stripe-form">
            {/* display error message */}
            {(isError || errorPayment || warning || message) && 
                <Message variant={isError ? "danger" 
                                  : warning ? "warning" 
                                  : ((message && !isError) && (message && !warning)) && "success" }>{errorPayment ? errorPayment : message}</Message>
            } 
                   
               {(!stripe || !elements) && <Message variant="danger">Stripe has not loaded</Message>}    
    
                <PaymentElement id="payment-element"/>
            {/* {method === 'card' && (
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
            {method === 'fpx' && (
               <div>
                    <Form.Group className="mb-3" controlId="fpx-bank-element">
                        <Form.Label>FPX</Form.Label>
                        <FpxBankElement id="fpx-bank-element" options={{accountHolderType: 'individual'}}/>
                    </Form.Group>  
                    {/* <FPX  /> */}
               {/* </div>
            )} */} 
            
            {stripe && elements && (
                <div className="d-grid">
                    {loading && <Loader/>}
                    <Button type="submit" variant="primary" className="my-3 mt-4" disabled={!stripe || !elements || loading}>
                         Place Order
                    </Button>
                </div>

            )}
            
            
            
        </Form>
    )
}

export default CheckoutForm
