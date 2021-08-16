import React from 'react'
import {Container} from 'react-bootstrap'
import Products from '../components/Products'


const HomeScreen = () => {

    return (
        <Container className="py-5" >
            <h1>Latest Products</h1>
            <Products l="4" xl="3"/>           
        </Container>
    )
}

export default HomeScreen
