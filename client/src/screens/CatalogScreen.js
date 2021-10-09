import React, {useSelector, useState} from 'react'
import Products from '../components/Products'

import { useHistory } from 'react-router'

//UI components
import {Container, Row, Col} from 'react-bootstrap'
import Paginate from '../components/Paginate'




const CatalogScreen = () => {

    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [keyword, setKeyword] = useState('')

    const getData = (data) => {
        setPage(data.page)
        setPages(data.pages)
        setKeyword(data.keyword)
    }

    return (
        <section>
            <Row>
                <Col md={4} xl={3} className="ps-0 bg-light"></Col>
                <Col md={8}>
                    <Container className="py-5">
                        <h1>Products</h1>
                        <Products l="5" xl="4" val={getData}/> 
                        <Paginate path="/products" page={page} pages={pages} keyword={keyword}/>

                    </Container>
                    
                </Col>
            </Row>
            
        </section>
    )
}

export default CatalogScreen
