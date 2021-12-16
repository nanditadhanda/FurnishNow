import React, {useEffect, useState} from 'react'

//Routing
import { LinkContainer } from 'react-router-bootstrap'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import relavant product action
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'

//import constant
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'
//UI components
import {Row, Col, Table, Button, Container} from 'react-bootstrap'
import { IoTrashSharp } from 'react-icons/io5'
import {IoMdAddCircleOutline} from 'react-icons/io'
import {MdEdit} from 'react-icons/md'
import { AiFillEye} from 'react-icons/ai'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import SideBar from '../components/SideBar'
import Search from '../components/Search'

const ProductListScreen = ({history}) => {
    //set dispatch
    const dispatch = useDispatch()

    //select productList state
    const productList = useSelector(state => state.productList)
    //destructure state
    const {loading, error, products, page, pages} = productList

    //select productDelete state
    const productDelete = useSelector(state => state.productDelete)
    //destructure state
    const {loading:deleteLoading, error: deleteError, success: deleteSuccess} = productDelete

    //select productCreate state
    const productCreate = useSelector(state => state.productCreate)
    //destructure state
    const{loading: createLoading, error: createError, success:createSuccess, product: productCreated} = productCreate


    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    //ordering and filter
    const [filter, setFilter] = useState('')
    const [ordering, setOrdering] = useState('_id')
    const [searchPath, setSearchPath] = useState('')
    
    let keyword = history.location.search

    useEffect(() => { 
        
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo || (userInfo && !userInfo.isSystemAdmin && !userInfo.isStoreManager)){
            history.push("/accessdenied")
        } else{
            if(userInfo.isSystemAdmin){
                setSearchPath('admin/productlist')
            } else{
                setSearchPath('store-manager/productlist')
            }
        }
        
        if(createSuccess){
            history.push(`/store-manager/product/${productCreated._id}/edit`)
        }
        else{            
            dispatch(listProducts(keyword, ordering, filter))
        }

    },[dispatch, history, userInfo, deleteSuccess, createSuccess, productCreated, keyword,ordering, filter])


    //delete user
    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you would like to delete this product?")){
            dispatch(deleteProduct(id))
        }
        
    }

    //create product
    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <Row>
            <SideBar activeTab="product"></SideBar>
            <Col>
                <Container className="py-5">
                <h1 className="mb-5">Products</h1>
 
                {// loading while performing create or delete action
                    (createLoading || deleteLoading) && <Loader />
                }
                {//error when creating or deleting product
                    (createError || deleteError) && <Message variant="danger">Error: {createError ? createError : deleteError}</Message>                  
                }

                
                <div className="d-flex mb-5 justify-content-between"> 
                    <Search path={searchPath} className="mb-3" title="Search Product"/>
                               
                    {userInfo && userInfo.isStoreManager && 
                        <Button variant="outline-success" onClick={createProductHandler}>
                            <IoMdAddCircleOutline className="me-2 mb-1 fs-5"/>Add Product 
                        </Button>  
                    }                      
                </div>
                        



                { /*show loader if loading */
                loading ? <Loader />
                    /*else if an error occured, display error message */
                    : error ? <Message variant="danger">{error}</Message>
                    /*else show page content */
                    : ( <>
                        <Table striped bordered responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>                                
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Price (MYR)</th>
                                    
                                    <th></th>
                                </tr>                            
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>                                    
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>{product.salePrice}</td>
                                        <td className="text-center">
                                            <LinkContainer to={`/product/${product.category_slug}/${product._id}`}>
                                                <Button variant="outline-primary"   className="btn-icon me-2"><AiFillEye/></Button>
                                            </LinkContainer>
                                            {userInfo && userInfo.isStoreManager &&
                                                <>
                                                    <LinkContainer to={`/store-manager/product/${product._id}/edit`}>
                                                        <Button variant="outline-success"   className="btn-icon me-2"><MdEdit/></Button>
                                                    </LinkContainer>
                                                    <Button variant="outline-danger"  className="btn-icon" onClick={() => deleteHandler(product._id)}><IoTrashSharp /></Button>
                                                </>
                                            }
                                            </td>
                                            
                                    </tr>
                                ))}
                            
                                
                            </tbody>

                        </Table>
                        <Paginate path="/admin/productlist" page={page} pages={pages} keyword={keyword}/>
                        </>
                    )}
                
            </Container>
            
            </Col>
            

        </Row>
        
    )
}

export default ProductListScreen
