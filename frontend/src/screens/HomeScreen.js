import React from 'react'
import {Row, Col} from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'


const HomeScreen = () => {
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col className="d-flex" key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>

                ))}
            </Row>
            
        </div>
    )
}

export default HomeScreen
