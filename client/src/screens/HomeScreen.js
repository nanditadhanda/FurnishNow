import React, {useEffect} from 'react'

//redux hooks
import { useDispatch, useSelector } from 'react-redux'

import { listTopProducts } from '../actions/productActions'
import {listCategories} from '../actions/categoryActions'

//UI components
import Product from '../components/Product'
import Category from '../components/Category'
import { Container, Row, Col, Image } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'


const HomeScreen = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {error: errorProduct, loading : loadingProduct, products} = productTopRated

    const categoryList = useSelector(state => state.categoryList)
    const {error: errorCategory, loading: loadingCategory, categories} = categoryList

    //useEffect is triggered when component loads
    useEffect(() => {
       dispatch(listTopProducts())

       if(!categories){
           dispatch(listCategories())
       }
    }, [dispatch, categories])

    return (
        <>
        <div className="banner">
            <Image src="/banner.png" responsive/>
        </div>    
        <Container className="py-5">
            <h3 className="my-5">Shop By Category</h3>

             {   
                loadingCategory ? <Loader />
                : errorCategory ? <Message >{errorCategory}</Message>
                : categories &&
                <div>
                    <Category categories={categories} />    
                </div>
            }



            <h3 className="my-5">Top Rated Products</h3>
            {   
                loadingProduct ? <Loader />
                : errorProduct ? <Message >{errorProduct}</Message>
                : products &&
                <Row>{
                    products.map(product=>(
                        <Col className="d-flex" key={product._id} sm={6} md={4} lg={3}>
                            <Product product={product} />
                        </Col>  
                    ))
                }
                </Row>
            }
              
        </Container>
            
        </>
        
                    
        
    )
}

export default HomeScreen
