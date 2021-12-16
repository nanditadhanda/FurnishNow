import React, {useState, useEffect} from 'react'
import Products from '../components/Products'

//redux
import { useDispatch, useSelector } from 'react-redux'

//UI components
import {Container, Row, Col, Form, Nav, Button} from 'react-bootstrap'
import Paginate from '../components/Paginate'
import Rating from '../components/Rating'

//Icons
import {AiOutlineLine} from 'react-icons/ai'
import Message from '../components/Message'

const CatalogScreen = ({match}) => {

    const dispatch = useDispatch()

    const categoryActive = match.params.category


    //category state
    //categories
    const categoryList = useSelector(state => state.categoryList)

    const [categories, setCategories] = useState('')
    let [categoryFilter] = useState('')

    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [keyword, setKeyword] = useState('')
    const [filter, setFilter] = useState('')
    const [ordering, setOrdering] = useState('_id')

    //filter states
    const [price_min, setPriceMin] = useState('')
    const [price_max, setPriceMax] = useState('')
    const [rating, setRating] = useState('')
    const [errorFilter, setErrorFilter] = useState('')

    const getData = (data) => {
        setPage(data.page)
        setPages(data.pages)
        setKeyword(data.keyword)
        //setFilter(data.filter)
    }
    
    //orderhandler

    const orderingHandler = (e) => {
        const value = e.target.value        
        setOrdering(value)
    }

    //apply filter
    const applyFilterHandler = (e) => {
        e.preventDefault()
        
        if((Number(price_max)<=Number(price_min)) && (price_max !=='' && price_min !== '')){
            setErrorFilter("Min price cannot be greater than or equal to max price")
        }
        else if((price_max !== '' && price_min !== '') || rating !== '' ){
            setErrorFilter("")
            if(categoryActive === 'all'){
                setFilter(`&price_max=${price_max}&price_min=${price_min}&rating_min=${rating}`)   
            }
            else{
                setFilter(`category=${categoryActive}&price_max=${price_max}&price_min=${price_min}&rating_min=${rating}`)
            }
                 
        }
        else{
            setErrorFilter("Please select filters to apply")                 
        }
    }

    const clearFilterHandler = () => {
        setErrorFilter("")  
        setFilter('') 
    }

    useEffect(()=> {
                      
        setCategories(categoryList.categories)   

    }, [dispatch, categories, categoryList, categoryFilter, categoryActive, filter])

    return (
        <section>
            <Row>
                <Col md={4} xl={3} className="px-0 pb-5 bg-light">
                    <div >
                        <h5 className="px-5 pt-5">Categories</h5>
                        <Nav className="flex-column py-2 nav-side" variant="pills">
                            <Nav.Link href="/products/all" 
                                className="px-5 "
                                active={categoryActive === 'all' }>
                                All Categories
                            </Nav.Link>
                            {categories !=='' && (categories.map((category)=> (
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
                            <h5 className="px-5 pt-2">Filters</h5>
                            <Form className="px-5 pt-2">
                                {errorFilter !=='' && (
                                    <Message variant="danger">{errorFilter}</Message>
                                )}
                                <Form.Group className="mb-3">
                                    <Form.Label>Price Range</Form.Label>
                                    <Row>
                                        <Col xs={5}>
                                            <Form.Control 
                                                size="sm" 
                                                type="text" 
                                                placeholder="RM Min" 
                                                value={price_min}
                                                onChange={(e)=>{setPriceMin(e.target.value)}}
                                            />
                                        </Col>
                                        <Col xs={2}  className="text-center"><AiOutlineLine/></Col>
                                        <Col xs={5}>
                                            <Form.Control 
                                                size="sm"
                                                type="text"
                                                placeholder="RM Max" 
                                                value={price_max} 
                                                onChange={(e)=>{setPriceMax(e.target.value)}}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group> 
                                <fieldset>
                                <Form.Group as={Row} className="mb-3">
                                <Form.Label >
                                    Rating
                                </Form.Label>
                                <Col >
                                    <Form.Check.Input
                                        type="radio"
                                        name="rating"
                                        id="5.00"
                                        value="5.00"
                                        className=""
                                        checked={Number(rating)===5.00}
                                        onChange={(e)=>{setRating(e.target.value)}}

                                    />
                                    <Form.Check.Label for="5.00"className="lh-1 ms-2"><Rating size="fs-5" value='5' text='' color="text-primary"/></Form.Check.Label>
                                    <br />
                                    <Form.Check.Input
                                        type="radio"
                                        name="rating"
                                        id="4.00"
                                        value="4.00"
                                        className=""
                                        checked={Number(rating)===4.00}
                                        onChange={(e)=>{setRating(e.target.value)}}
                                    />
                                    <Form.Check.Label for="4.00" className="lh-1 ms-2"><Rating size="fs-5" value='4' text='&nbsp;and up' color="text-primary"/></Form.Check.Label>
                                    <br />

                                    <Form.Check.Input
                                        type="radio"
                                        name="rating"
                                        id="3.00"
                                        value="3.00"
                                        className=""
                                        checked={Number(rating)===3.00}
                                        onChange={(e)=>{setRating(e.target.value)}}
                                    />
                                    <Form.Check.Label for="3.00" className="lh-1 ms-2"><Rating size="fs-5" value='3' text='&nbsp;and up' color="text-primary"/></Form.Check.Label>
                                    <br />

                                    <Form.Check.Input
                                        type="radio"
                                        name="rating"
                                        id="2.00"
                                        value="2.00"
                                        className=""
                                        checked={Number(rating)===2.00}
                                        onChange={(e)=>{setRating(e.target.value)}}
                                    />
                                    <Form.Check.Label for="2.00" className="lh-1 ms-2"><Rating size="fs-5" value='2' text='&nbsp;and up' color="text-primary"/></Form.Check.Label>
                                    <br />

                                    <Form.Check.Input
                                        type="radio"
                                        name="rating"
                                        id="1.00"
                                        value="1.00"
                                        className=""
                                        checked={Number(rating)===1.00}
                                        onChange={(e)=>{setRating(e.target.value)}}
                                    
                                    />
                                    <Form.Check.Label for="1.00" className="lh-1 ms-2"><Rating size="fs-5" value='1' text='&nbsp;and up' color="text-primary"/></Form.Check.Label>
                                    <br />
                                </Col>
                                </Form.Group>
                            </fieldset> 
                            <Row >
                                
                                <Col xs className="d-grid"><Button type="submit" variant="success" onClick={applyFilterHandler}>Apply</Button></Col>
                                <Col xs className="d-grid"><Button type="submit" variant="outline-success" onClick={clearFilterHandler}>Clear</Button></Col>
                            </Row>
                                   
                            </Form>
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
                                        <option value="-salePrice">Price: High to Low</option>
                                        <option value="salePrice">Price: Low to High</option>
                                        <option value="name">Name: A-Z</option>
                                        <option value="-name">Name: Z-A</option>
                                        <option value="rating">Rating: 0-5</option>
                                        <option value="-rating">Rating: 5-0</option>
                                                                                
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Products l="5" xl="4" val={getData} ordering={ordering} filter={
                                        filter !== '' ? filter : categoryActive !== 'all'? ('category='+categoryActive) : ''}/> 
                        <Paginate path={`/products/${categoryActive}`} page={page} pages={pages} keyword={keyword} filter={ filter !== '' ? filter : categoryActive !== 'all'? ('category='+categoryActive) : ''}/>

                    </Container>
                    
                </Col>
            </Row>
            
        </section>
    )
}

export default CatalogScreen
