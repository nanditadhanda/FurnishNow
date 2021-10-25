import React, {useState, useEffect, useCallback} from 'react'
import Products from '../components/Products'

import { useHistory } from 'react-router'

//redux
import { useDispatch, useSelector } from 'react-redux'

//import actions

import { listCategories } from '../actions/categoryActions'

//UI components
import {Container, Row, Col, Form, Nav} from 'react-bootstrap'
import Paginate from '../components/Paginate'
import {ImSortAlphaDesc} from 'react-icons/im'







const CatalogScreen = ({match}) => {

    const dispatch = useDispatch()

    const categoryActive = match.params.category

    console.log("category:", categoryActive)

    //category state
    //categories
    const categoryList = useSelector(state => state.categoryList)

    const [categories, setCategories] = useState('')
    let [categoryFilter, setCategoryFilter] = useState('')

    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [keyword, setKeyword] = useState('')
    const [filter, setFilter] = useState('')
    const [ordering, setOrdering] = useState('_id')

    const getData = (data) => {
        setPage(data.page)
        setPages(data.pages)
        setKeyword(data.keyword)
        setFilter(data.filter)
    }
    
    //orderhandler

    const orderingHandler = (e) => {
        const value = e.target.value        
        setOrdering(value)
    }


    console.log("keyword:", keyword)

    useEffect(()=> {
                      
        setCategories(categoryList.categories)    

    }, [dispatch, categories, categoryList, categoryFilter])

    return (
        <section>
            <Row>
                <Col md={4} xl={3} className="px-0 bg-light">
                    <div >
                        <h5 className="px-5 pt-5">Categories:</h5>
                        <Nav className="flex-column py-2 nav-side" variant="pills">
                            <Nav.Link href="/products/all" 
                                className="px-5 "
                                active={categoryActive === 'all' }>
                                All Categories
                            </Nav.Link>
                            {categories !=='' && (categories.map((category, index )=> (
                                <Nav.Link  
                                    className="px-5 "          
                                    href={`/products/${category.slug}`}
                                    key={category._id}
                                    id= {category._id}
                                    active={categoryActive === category.slug }>
                                    {category.name}  
                                </Nav.Link>
                                 )))}
                                
                            </Nav>
                        <Form>
                        
                            
                        </Form>
                        <div>                            
                            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked />
                            <label class="btn btn-secondary" for="option1">Checked</label>

                            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off"/>
                            <label class="btn btn-secondary" for="option2">Radio</label>

                            <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" />
                            <label class="btn btn-secondary" for="option3">Disabled</label>

                            <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off" />
                            <label class="btn btn-secondary" for="option4">Radio</label>  
                            
                        </div>
                    </div>
            

                    
                </Col>
                <Col md={8}>
                    <Container className="py-5">
                        
                        <Row>
                            <Col xs={6} md={8}><h1>Products</h1></Col>
                            <Col xs={6} md={4}>
                                <Form.Group className="d-flex align-items-center">
                                    <Form.Label className="me-2">Sort By:</Form.Label>
                                    <Form.Select aria-label="Sort" className="w-75 d-inline-block" onChange={orderingHandler}>
                                        <option value='_id'>Select</option>
                                        <option value="name">Name: A-Z</option>
                                        <option value="-name">Name: Z-A</option>
                                        <option value="rating">Rating: 0-5</option>
                                        <option value="-rating">Rating: 5-0</option>
                                        <option value="-salePrice">Price: High to Low</option>
                                        <option value="salePrice">Price: Low to High</option>                                        
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Products l="5" xl="4" val={getData} ordering={ordering} filter={categoryActive !== 'all'? ('category='+categoryActive) : ''}/> 
                        <Paginate path={`/products/${categoryActive}`} page={page} pages={pages} keyword={keyword} filter={categoryActive !== 'all'? ('category='+categoryActive) : ''}/>

                    </Container>
                    
                </Col>
            </Row>
            
        </section>
    )
}

export default CatalogScreen
