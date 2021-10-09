import React from 'react'
import Products from '../components/Products'

//UI components
import {Container, Row, Col} from 'react-bootstrap'


const CatalogScreen = () => {

    return (
        <section>
            <Row>
                <Col md={4} xl={3} className="ps-0 bg-light"></Col>
                <Col md={8}>
                    <Container className="py-5">
                        <h1>Products</h1>
                        <Products l="5" xl="4"/> 
                    </Container>
                    
                </Col>
            </Row>
            
        </section>
    )
}

export default CatalogScreen
