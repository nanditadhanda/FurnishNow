import React from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap'

const FormContainer = ({children, title = "", md=10, lg=6 , xl=7, px="3", shadow="", bg="light", border="border-0"}) => {
    return (
         <Container className={`py-5 px-${px}`}>      
            <Row className="justify-content-md-center">
                <Col xs={12} md={md} lg={lg} xl={lg}>
                    <Card className={`p-5  ${shadow} ${border}`} bg={bg}>
                    {title !== "" ?<h1 className="text-center pb-3">{title}</h1> : ""}
                    {children} 
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer

