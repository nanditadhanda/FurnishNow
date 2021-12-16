import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import {Row, Col} from 'react-bootstrap'


import Product from '../components/Product'


//import redux and reducers
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'

//loading and error message components
import Loader from './Loader'
import Message from './Message'



//Products function
const Products = ({l, xl, val={}, ordering='_id', filter=''}) => {
    let count = 0

    const dispatch = useDispatch()

    //useSelector allows us to fire off certain parts of states
    const productList = useSelector(state => state.productList)

    //destructure the state
    const {error, loading, products, page, pages} = productList

    if(products){
         count = products.length
    }
   
    //declare history
    const history = useHistory()

    console.log("order:", ordering)

    //set keyword for search results
    let keyword = history.location.search

    if(val !== ''){
        val({page, pages, keyword})
    }

    //useEffect is triggered when component loads
    useEffect(() => {
        //fire off listProduct() action
       dispatch(listProducts(keyword, ordering, filter))
    }, [dispatch, keyword, ordering, filter])

    return (
        <>
        <Row>
            {//if state is loading
            loading ? <Loader/>
                //if error, render error
                : error ? 
                    <Message variant='danger'>Error: {error}</Message>
                    //else render product row
                    : 
                        count === 0 ? 
                             <Message variant='warning'>No products found matching the parameters passed.</Message>
                             :
                             products.map(product => (                        
                                <Col className="d-flex" key={product._id} sm={12} md={6} lg={l} xl={xl}>
                                    <Product product={product} />
                                </Col>                   
                            ))
                    
            }
        </Row>
        
        </>
            
       
    )
}

Products.defaultProps = {
    val: '',
}

Products.propTypes = {
    val: PropTypes.func,
}

//export Product function
export default Products


