//necessary imports
import React from 'react'

//UI components
import {Nav}  from 'react-bootstrap'
import {HiCheckCircle} from 'react-icons/hi'
import {BiCircle} from 'react-icons/bi'

//functional component
const OrderStatusSteps = ({step1, step2, step3, step4}) => {

    //return value
    return (
        <Nav className='justify-content-around mb-4 checkout-steps'>
            <div className="line"></div>
            {/* Step 1 */}
            <Nav.Item>
                {step1 && (
                    <Nav.Link className="text-success">
                        <div className="steps">
                           <HiCheckCircle className="text-success" />
                        </div>          
                        <span className="d-none d-lg-inline-block">Order&nbsp;</span>Placed
                    </Nav.Link>       
                )}
            </Nav.Item>
            {/* Step 2 */}
            <Nav.Item>
                <Nav.Link disabled className={step2 ? `text-success` : `text-secondary`}>
                    <div className="steps">
                        {step2 ? 
                            (<HiCheckCircle className="text-success" /> )
                            : <BiCircle className="text-secondary" />
                        }
                    </div>
                    <span className="d-none d-lg-inline-block">Order&nbsp;</span>Packaged
                </Nav.Link>                
            </Nav.Item>
            {/* Step 3 */}
            <Nav.Item>
                <Nav.Link disabled className={step3 ? `text-success` : `text-secondary`}>
                    <div className="steps">
                        {step3 ? 
                            (<HiCheckCircle className="text-success" /> )
                            : <BiCircle className="text-secondary" />
                        }
                    </div>
                    <span className="d-none d-lg-inline-block">Order&nbsp;</span>Shipped
                </Nav.Link>                
            </Nav.Item>
            {/* Step 4 */}
            <Nav.Item>
                <Nav.Link disabled className={step4 ? `text-success` : `text-secondary`}>
                    <div className="steps">
                        {step4 ? 
                            (<HiCheckCircle className="text-success" /> )
                            : <BiCircle className="text-secondary" />
                        }
                    </div>
                    <span className="d-none d-lg-inline-block">Order&nbsp;</span>Delivered
                </Nav.Link>                
            </Nav.Item>
           
            
        </Nav>
    )
}

export default OrderStatusSteps
