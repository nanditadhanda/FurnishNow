import React, {useState, useEffect} from 'react'
//stripe componetns
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

//import redux
import { useDispatch } from 'react-redux';

//import action
import {savePaymentInfo, updatePaymentInfo} from '../actions/paymentActions'

//UI elements
import {Form, Button} from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'

const Checkout = ({amount , paymentID, params}) => {

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null)
    const [variant, setVariant] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    //useEffect
    useEffect(() => {
    if (!stripe) {
      return;
    }

    //if parameters returned after payment attempt is made
    if(params !== ''){
      const clientSecret = params.payment_intent_client_secret

      if (!clientSecret) {
        return;
      }

      //retrieve payment intent from stripe to check payment status
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            setVariant('success')
            break;
          case "processing":
            setMessage("Your payment is processing.");
            setVariant('warning')
            setLoading(true)
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            setVariant('danger')
            break;
          default:
            setMessage("Something went wrong. "+paymentIntent.error.message);
            setVariant('danger')
            break;
        }

        //update payment info on database server
        if(params.source_type){
                dispatch(updatePaymentInfo({'paymentID': paymentIntent.id,
                                        'payment_method': params.source_type}))
            }else{
                dispatch(updatePaymentInfo({'paymentID': paymentIntent.id,
                                            'payment_method':''}))
            }
      });
    }
  }, [stripe, params, dispatch]);

    //------------stripe submit handler----------//
  
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);

    //create payment record
    dispatch(savePaymentInfo({'paymentID': paymentID}))

    //make payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/placeorder?return=true`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    if(error){
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
        setVariant('danger')
      } else {
        setMessage("An unexpected error occured.");
        setVariant('danger')
      }
    }

  
    setLoading(false);
  };
    return (
        <Form onSubmit={handleSubmit} id="payment-form" className="stripe-form">
            {(!stripe || !elements) && <Message variant="danger">Stripe has not loaded</Message>}    
            {message && <Message variant={variant}>{message}</Message>}     
              <PaymentElement id="payment-element"/>            
            {/* <FpxBankElement id="fpx-element" options={{accountHolderType: 'individual'}} /> */}
            {loading &&
            <><Loader/> 
              <p className="text-center">Processing Payment...</p></>            
             }
             {stripe && elements && (
                <div className="d-grid">
                    <Button type="submit" variant="primary" className="my-3 mt-4" disabled={!stripe || !elements || loading}>
                         Place Order
                    </Button>
                </div>

            )}

            
        </Form>
    )
}

export default Checkout
