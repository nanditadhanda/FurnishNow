import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'

import Product from '../components/Product'
import axios from 'axios'


const HomeScreen = () => {
    //products state - [set the state, method]
    const [products, setProducts] = useState([])

    //useEffect is triggered when component loads
    useEffect(() => {
        async function fetchProducts(){
            const { data } = await axios.get('api/products/')
            setProducts(data)
        }

        fetchProducts()
        
    }, [])

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
