import React , {useState, useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'

//paypal payment button
import { PayPalButton} from 'react-paypal-button-v2'

//UI elements 
import Loader from './Loader'

const Paypal = () => {
    //payment state
    const orderPayment = useSelector(state => state.orderPayment)
    const { success : successPayment, error: errorPayment, loading: loadingPayment} = orderPayment

    //-------------paypal ------------------//
    const [sdkReady, setSdkReady] = useState(false)

    //payment handler on successful payment
    const successPaymentHandler = (paymentResult) => {
        //dispatch(payOrderPaypal(paymentResult))
        console.log("status: ", paymentResult)
    }

    const addPayPalScript = () => {
         //client ID: Abz14EA_LsKtie3zGyRmoIbYd41Bebt5Fd9xJxOSQWenL3kT_7bb1eXZqZe-_RrZjAqiTgMP7F4hgbOX
        
        //create custom script element 
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=Abz14EA_LsKtie3zGyRmoIbYd41Bebt5Fd9xJxOSQWenL3kT_7bb1eXZqZe-_RrZjAqiTgMP7F4hgbOX'
        script.async = true
        //once script is loaded, set sdkReady to true
        script.onload = () =>{
            setSdkReady(true)
        }
        //once sdk is ready, append script to body of app
        document.body.appendChild(script)
    }

    useEffect(() => {
        if(!window.paypal){
                addPayPalScript()
            }
            else{
                setSdkReady(true)
            }
    }, [])

    

    return (
        <div>
            {loadingPayment && <Loader />}
                    {!sdkReady ? (
                        <Loader/>
                    ) : (
                        <PayPalButton 
                            amount='100'
                            onSuccess={successPaymentHandler}
                        />   
                    )}
            
        </div>
    )
}

export default Paypal
