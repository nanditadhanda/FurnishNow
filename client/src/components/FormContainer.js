import React from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap'

const FormContainer = ({children, title = "", lg=6}) => {
    return (
         <Container>
             
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} lg={lg}>
                    <Card className="p-5 mt-4 shadow border-0" bg="light">
                    <h1 className="text-center pb-3">{title}</h1>
                    {children} 
                    </Card>
                </Col>
            </Row>

            
        </Container>
    )
}

export default FormContainer

