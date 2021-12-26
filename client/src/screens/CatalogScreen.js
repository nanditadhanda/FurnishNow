import React, {useState, useEffect} from 'react'
import Products from '../components/Products'

//redux
import { useDispatch, useSelector } from 'react-redux'

//UI components
import {Container, Row, Col, Form, Nav, Button, Offcanvas} from 'react-bootstrap'
import Paginate from '../components/Paginate'
import Rating from '../components/Rating'
import Message from '../components/Message'

//Icons
import {AiOutlineLine} from 'react-icons/ai'
import{RiFilter2Line} from 'react-icons/ri'
import { LinkContainer } from 'react-router-bootstrap'

const CatalogScreen = ({match}) => {
    
    const categoryActive = match.params.category

    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [keyword, setKeyword] = useState('')
    const [ordering, setOrdering] = useState('_id') 
    const [filter, setFilter] = useState('')

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

    const filterHandler = (value) => {
        setFilter(value.filter)
    }

    //filter menu mobile screens - control        
    const [filterShow, setFilterShow] = useState(false);

    const handleClose = () => setFilterShow(false);
    const handleShow = () => setFilterShow(true);

    

    return (
        <section>
            <Row className="w-100">
                <Col lg={4} xl={3} className="px-0 pb-5 bg-light d-none d-lg-block">
                    <FilterMenu categoryActive={categoryActive} filterHandler={filterHandler}/>
                </Col>
                
                <Col lg={8} xl={9}>
                    <main>
                        <Container fluid className="py-5">
                            <Row>
                                <Col xs={12} lg={8}><h1 className='mb-3'>Products</h1></Col>
                                <Col xs={12} lg={4} className="align-items-center ">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <Button variant="outline-secondary" onClick={handleShow} className="d-lg-none my-3 me-3" style={{'minWidth':"90px"}}>
                                                <RiFilter2Line /> Filter
                                            </Button> 
                                        </div>                                     
                                        <Form.Group className="d-flex align-items-center justify-content-end">
                                            <Form.Label className="me-2">Sort:</Form.Label>
                                            <Form.Select aria-label="Sort" className="w-100 d-inline-block" onChange={orderingHandler}>
                                                <option value='_id'>Select</option>
                                                <option value="-salePrice">Price: High to Low</option>
                                                <option value="salePrice">Price: Low to High</option>
                                                <option value="name">Name: A-Z</option>
                                                <option value="-name">Name: Z-A</option>
                                                <option value="rating">Rating: 0-5</option>
                                                <option value="-rating">Rating: 5-0</option>
                                                                                        
                                            </Form.Select>
                                        </Form.Group>

                                    </div>
                                    
                                </Col>
                            </Row>
                            <Products md="4" l="6" xl="4" val={getData} ordering={ordering} filter={
                                            filter !== '' ? filter : categoryActive !== 'all'? ('category='+categoryActive) : ''}/> 
                            <Paginate path={`/products/${categoryActive}`} type="products" page={page} pages={pages} keyword={keyword} />

                        </Container>

                    </main>
                    
                    
                </Col>
            </Row>

            {/* filter menu - mobile screens only */}
            <Offcanvas show={filterShow} onHide={handleClose} className='d-lg-none'>
                <FilterMenu categoryActive={categoryActive} filterHandler={filterHandler}/>
            </Offcanvas>
            
        </section>
    )
}


//filter functional component
const FilterMenu = ({categoryActive, filterHandler}) => {

    const dispatch = useDispatch()

    //category state
    //categories
    const categoryList = useSelector(state => state.categoryList)

    const [categories, setCategories] = useState('')
    const [filter, setFilter] = useState('')
    let [categoryFilter] = useState('')

     //filter states
    const [price_min, setPriceMin] = useState('')
    const [price_max, setPriceMax] = useState('')
    const [rating, setRating] = useState('')
    const [errorFilter, setErrorFilter] = useState('')

    //apply filter
    const applyFilterHandler = (e) => {
        e.preventDefault()
        
        //min price entered is less than max
        if((Number(price_max)<=Number(price_min)) && (price_max !=='' && price_min !== '')){
            setErrorFilter("Min price cannot be greater than or equal to max price")
        }  
        //only one price filter is entered   
        else if((price_max === '' && price_min !== '') || (price_max !== '' && price_min === '')){
            if(price_max === '' && price_min !== ''){
                setErrorFilter("Please enter max price")
            }else{
                setErrorFilter("Please enter min price")
            }
        }
        //no errors
        else if((price_max !== '' && price_min !== '') || rating !== '' ){
            setErrorFilter("")
            if(categoryActive === 'all'){
                setFilter(`&price_max=${price_max}&price_min=${price_min}&rating_min=${rating}`)   
            }
            else{
                setFilter(`&category=${categoryActive}&price_max=${price_max}&price_min=${price_min}&rating_min=${rating}`)
            }        
        }
        // button pressed without passing parameters
        else{
            setErrorFilter("No filter parameters passed")                 
        }
    }

    //clear filters applied
    const clearFilterHandler = () => {
        setErrorFilter("")  
        setFilter('') 
        setRating('')
        setPriceMax('')
        setPriceMin('')
    }

    useEffect(()=> {      
        setCategories(categoryList.categories)  
        filterHandler({filter}) 

    }, [dispatch, categories, categoryList, categoryFilter, categoryActive, filter, filterHandler])


    return (
         
    <aside className='py-3'>
        <h5 className="px-5">Categories</h5>
        <Nav className="flex-column py-2 nav-side" variant="pills">
            <LinkContainer  to="/products/all">
                 <Nav.Link 
                    className="px-5 "
                    active={categoryActive === 'all' }>
                    All Categories
                </Nav.Link>
            
            </LinkContainer>
           
            {categories !=='' && (categories.map((category)=> (
                <LinkContainer to={`/products/${category.slug}`} key={category.id}>
                    <Nav.Link  
                        className="px-5 "        
                        id= {category.id}
                        active={categoryActive === category.slug }>
                        {category.name}  
                    </Nav.Link>                
                </LinkContainer>                
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
                    <Form.Check.Label htmlFor="5.00"className="lh-1 ms-2"><Rating size="fs-5" value='5' text='' color="text-primary"/></Form.Check.Label>
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
                    <Form.Check.Label htmlFor="4.00" className="lh-1 ms-2"><Rating size="fs-5" value='4' text='&nbsp;and up' color="text-primary"/></Form.Check.Label>
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
                    <Form.Check.Label htmlFor="3.00" className="lh-1 ms-2"><Rating size="fs-5" value='3' text='&nbsp;and up' color="text-primary"/></Form.Check.Label>
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
                    <Form.Check.Label htmlFor="2.00" className="lh-1 ms-2"><Rating size="fs-5" value='2' text='&nbsp;and up' color="text-primary"/></Form.Check.Label>
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
                    <Form.Check.Label htmlFor="1.00" className="lh-1 ms-2"><Rating size="fs-5" value='1' text='&nbsp;and up' color="text-primary"/></Form.Check.Label>
                    <br />
                </Col>
                </Form.Group>
            </fieldset> 
            <Row >
                <Col xs className="d-grid"><Button type="submit" variant="success" onClick={applyFilterHandler}>Apply</Button></Col>
                <Col xs className="d-grid"><Button type="submit" variant="outline-success" onClick={clearFilterHandler}>Clear</Button></Col>
            </Row>                            
        </Form>
    </aside>  
    )
}


export default CatalogScreen