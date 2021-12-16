import React from 'react'
import {Container, Row, Col, Nav} from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className="py-3">
            <Container fluid>
                <Row>
                    <Col xs="12" md="5" className="text-left">&copy; 2021 FurnishNow</Col>
                    <Col className="d-flex justify-content-end">
                        <Nav className="text-secondary">     
                            <Nav.Link className="py-0" href="/about">About</Nav.Link>
                            <Nav.Link className="py-0" href="/contact">Contact</Nav.Link>
                            <Nav.Link className="py-0" href="/privacy">Privacy</Nav.Link>
                            <Nav.Link className="py-0" href="/tnc">T&amp;C</Nav.Link>
                        </Nav>
                    </Col>             
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
