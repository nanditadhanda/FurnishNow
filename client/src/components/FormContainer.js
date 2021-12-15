import React from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap'

const FormContainer = ({children, title = "", lg=6 , shadow="", bg="light", border="border-0"}) => {
    return (
         <Container className="py-5 px-3">
             
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} lg={lg}>
                    <Card className={`p-5 mt-4  ${shadow} ${border}`} bg={bg}>
                    {title !== "" ?<h1 className="text-center pb-3">{title}</h1> : ""}
                    {children} 
                    </Card>
                </Col>
            </Row>

            
        </Container>
    )
}

export default FormContainer

