import React from 'react'

import {Row, Col, Container , Image} from 'react-bootstrap'

const AboutUsScreen = () => {
    return (
        <Container className='py-5'>
            <Row>
                <Col md={6} xs={12}>
                    <Image fluid src="/ar_demo.png" alt="Furnish Now Demo" className="shadow-sm border mb-4"/>
                </Col>
                <Col>
                    <h1 >About Us</h1>
                    <p className="lh-5 py-2 text-justify">Ever purchased furniture online only to find out that the piece wasn't the right fit either aesthetically or quite literally? Purchasing furniture online can be a nerve wrecking endeavour; not to mention the costs involved only to find out the piece was not suitable. </p> 

                    <p className="lh-5 py-2 text-justify">This is where Furnish Now comes to save the day. We, at Furnish Now, understand the frustrations a customer goes through when purchasing furniture online and aim to tackle the problem by introducing our new website that offers the ability to view the furniture in your space using Augmented Reality before purchase.</p> 

                    <p className="lh-5 py-2 text-justify">Don't want to use your mobile phone to access the website? Don't worry! We've got you covered. Alternative to AR features, we provide an immersive VR interactive environment where you can freely interact with the 3D model of your selected product prior to purchasing it. </p> 

                    <p className="lh-5 py-2 text-justify">We aim to make shopping for furniture fun, interactive and as stress free as possible where you can invest in the furniture of your dreams without a hassle.</p>
                    
                </Col>
            </Row>
            
        </Container>
    )
}

export default AboutUsScreen
