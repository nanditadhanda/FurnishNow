//react import
import React, {useEffect, useState} from 'react';
import {withRouter, useLocation} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

//Stripe imports
import {FpxBankElement, useStripe, useElements} from '@stripe/react-stripe-js';

//UI elements
import {Form, Button} from 'react-bootstrap'
import Message from './Message';

import {createPaymentIntent} from '../actions/orderActions'

//main fpx form
const FpxForm = () => {

    //stripe elements
    const stripe = useStripe();
    const elements = useElements();

    //error message response
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState('false')

    const dispatch = useDispatch()

    //submit handler

    const handleSubmit = async (e) => {
        //prevent default submission
        e.preventDefault()

         if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            setMessage('Stripe.js has not yet loaded.');
            return;
        }

        let {error: backendError, clientSecret} = dispatch(createPaymentIntent({
            paymentMethodType: 'fpx',
        }))

        if (backendError) {
            setMessage(backendError.message)
            setIsError(true)
            return;
        }

        setIsError(false)
        setMessage('Client secret returned');
        console.log(message)


        //get stripe card element
        const fpx = elements.getElement(FpxBankElement);

        //stripe payment api
        const {paymentIntent, error: stripeError} = await stripe.confirmFpxPayment(
            clientSecret,            
        {
            payment_method: {
                fpx: fpx,
            },
            return_url: `${window.location.origin}/placeorder?return=true`,
        })

        if (stripeError) {
        // Show error to your customer (e.g., insufficient funds)
        setMessage(stripeError.message)
        setIsError(true)
        return;
        }

        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        setIsError(false)
        setMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);

        console.log("payment method: ", paymentIntent)
    }


    return (
        <>
            {/* display error message */}
            {(isError && message) &&
                (<Message variant="danger">{message}</Message>)
            }
            {/* display error message */}
            {(!isError && message) &&
                (<Message variant="success">{message}</Message>)
            }
            {/* fpx form */}
            <Form id="payment-form" onSubmit={handleSubmit}>
                <FpxBankElement options={{accountHolderType: 'individual'}} />
                <Button type="submit">Place Order</Button>
            </Form>   
        </>
    )
}

// Component for displaying results after returning from
// bancontact redirect flow.
const FpxReturn = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState();

  const query = new URLSearchParams(useLocation().search);
  const clientSecret = query.get('payment_intent_client_secret');

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const fetchPaymentIntent = async () => {
      const {error, paymentIntent} = await stripe.retrievePaymentIntent(
        clientSecret
      );
      if (error) {
        setMessage(error.message);
      }
      setMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    };
    fetchPaymentIntent();
  }, [clientSecret, stripe, setMessage]);

  return (
    <>
      <h1>FPX Return</h1>
      <Message>{message}</Message>
    </>
  );
};


const FPX = () => {
  const query = new URLSearchParams(useLocation().search);
  if (query.get('return')) {
    return <FpxReturn />;
  } else {
    return <FpxForm />;
  }
};

export default withRouter(FPX);

