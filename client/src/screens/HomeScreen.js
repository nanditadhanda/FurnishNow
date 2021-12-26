import React, {useEffect} from 'react'

//redux hooks
import { useDispatch, useSelector } from 'react-redux'

import { listTopProducts } from '../actions/productActions'
import {listCategories} from '../actions/categoryActions'

//UI components
import Product from '../components/Product'
import Category from '../components/Category'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'


const HomeScreen = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {error: errorProduct, loading : loadingProduct, products} = productTopRated

    const categoryList = useSelector(state => state.categoryList)
    const {error: errorCategory, loading: loadingCategory, categories} = categoryList

    //useEffect is triggered when component loads
    useEffect(() => {
        dispatch(listTopProducts())
        dispatch(listCategories())
    }, [dispatch])

    return (
        <>
        <div className="banner">
            <Image src="/static/images/banner.png" fluid/>
        </div> 
        <div className="bg-light">
            <Container className="py-4">
                <h3 className="mb-4 text-center text-success">Shop By Category</h3>
                {   
                    loadingCategory ? <Loader />
                    : errorCategory ? <Message variant="danger" >{errorCategory}</Message>
                    : categories &&
                    <div>
                        <Category categories={categories} />    
                    </div>
                }
            </Container>      
        </div> 
        <Container className="py-4">  
            <h3 className="mb-4 text-center text-success">Top Rated Products</h3>
            {   
                loadingProduct ? <Loader />
                : errorProduct ? <Message variant="danger">{errorProduct}</Message>
                : products &&
                <>
                    <Row>{
                        products.map(product=>(
                            <Col className="d-flex" key={product._id} sm={6} md={4} lg={3}>
                                <Product product={product} />
                            </Col>  
                        ))
                    }
                    </Row>

                    <div className="text-center my-4">
                        <LinkContainer to="/products/all" > 
                            <Button variant="outline-success" >View All Products</Button>
                        </LinkContainer>
                    </div>
                    
                   
                </>
            }
              
        </Container>
            
        </>          
        
    )
}

export default HomeScreen
