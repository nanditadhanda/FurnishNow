import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Row, Col, Button} from 'react-bootstrap'

import {MdAlternateEmail, MdOutlinePhoneInTalk, MdMapsHomeWork} from 'react-icons/md'


const ContactScreen = () => {
    const mailHandler = () => {
         window.open("mailto:info@furnishnow.com","_blank")
        return null
    }
    const phoneHandler = () => {
         window.open("tel:+60123456789","_blank")
        return null
    }
    return (
        <Container className='py-5'>
            <h1 className="text-center mb-4">Contact Us</h1>
            <Row className="justify-content-md-center">
                <Col md={5} >
                    <Card className='border-0 shadow-sm bg-light my-3'>
                        <Card.Body>
                            <Row className="my-2">
                                <Col md={5}><h6><MdAlternateEmail className='me-3 text-success fs-5'/>Email:</h6></Col>
                                <Col><Button onClick={mailHandler} variant="link" className="p-0 text-success text-decoration-none">info@furnishnow.com</Button></Col>
                            </Row>
                            <Row className="my-2">
                                <Col md="5"><h6><MdOutlinePhoneInTalk  className='me-3 text-success fs-5'/>Phone:</h6></Col>
                                <Col ><Button onClick={phoneHandler} variant="link" className="p-0 text-decoration-none text-success">+60-12-345-6789</Button></Col>
                            </Row>
                            <Row className="my-2">
                                <Col md="5"><h6><MdMapsHomeWork  className='me-3 text-success fs-5'/>Address:</h6></Col>
                                <Col className="">
                                    <p className='m-0'>Furnish Now Sdn Bhd</p>
                                    <p className='m-0'>A1-29-05, Jalan Teknologi, </p>
                                    <p className='m-0'>Business District, Bangsar South,</p>
                                    <p className='m-0'> Petaling Jaya, Selangor.</p>
                                </Col>
                            </Row>
                        </Card.Body>                   

                    </Card>
                </Col>

            </Row>
            
            
        </Container>
    )
}

export default ContactScreen
