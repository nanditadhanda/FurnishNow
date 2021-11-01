//necessary imports
import React from 'react'

//UI components
import {Nav}  from 'react-bootstrap'
import {HiCheckCircle} from 'react-icons/hi'
import {BiCircle} from 'react-icons/bi'
import {RiRadioButtonFill} from 'react-icons/ri'

//routing
import {LinkContainer}  from 'react-router-bootstrap'

//functional component
const CheckoutSteps = ({step1, step2, step3}) => {

    //return value
    return (
        <Nav className='justify-content-around mb-4 checkout-steps'>
            <div className="line"></div>
            {/* Step 1 */}
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/cart'>
                        
                        <Nav.Link className="text-success">
                            <div className="steps">
                                {!step2 ?
                                    (<RiRadioButtonFill  className="text-success" />)
                                    :
                                    (<HiCheckCircle className="text-success" />)
                                }
                            </div>          
                            Cart
                        </Nav.Link>
                    </LinkContainer>
                ) :
                (
                    <Nav.Link disabled>
                        <div className="steps">
                            <BiCircle className="text-secondary" />
                        </div>
                        Cart
                    </Nav.Link>
                )}
            </Nav.Item>
            {/* Step 2 */}
            <Nav.Item>
                {step2 ? (
                   
                    <LinkContainer to='/shipping'>
                        <Nav.Link className="text-success">
                            <div className="steps">
                                {!step3 ?
                                    (<RiRadioButtonFill  className="text-success" />)
                                    :
                                    (<HiCheckCircle className="text-success" />)
                                }
                            </div>
                            Shipping
                        </Nav.Link>
                    </LinkContainer>
                ) :
                (
                    <Nav.Link disabled>
                        <div className="steps">
                            <BiCircle className="text-secondary" />
                        </div>
                        Shipping
                    </Nav.Link>
                )}
            </Nav.Item>
            {/* Step 3
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link className="text-success">
                            <div className="steps">
                                <HiCheckCircle className="text-success" />
                            </div>
                            Payment
                        </Nav.Link>
                    </LinkContainer>
                ) :
                (
                    <Nav.Link disabled>
                        <div className="steps">
                            <BiCircle className="text-secondary" />
                        </div>
                        Payment
                    </Nav.Link>
                )}
            </Nav.Item> */}
            {/* Step 4 */}
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link className="text-success">
                            <div className="steps">
                                <RiRadioButtonFill className="text-success" />
                            </div>
                            Place Order
                        </Nav.Link>
                    </LinkContainer>
                ) :
                (
                    <Nav.Link disabled>
                        <div className="steps">
                            <BiCircle className="text-secondary" />
                        </div>
                        Place Order
                    </Nav.Link>
                )}
            </Nav.Item>
            
        </Nav>
    )
}

export default CheckoutSteps
