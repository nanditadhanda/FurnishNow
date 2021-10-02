import React, {useState, useEffect} from 'react'

//Routing
import { LinkContainer } from 'react-router-bootstrap'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import userList action
import { listProducts, deleteProduct } from '../actions/productActions'

//UI components
import {Table, Button, Row, Col} from 'react-bootstrap'
import { IoTrashSharp } from 'react-icons/io5'
import {IoMdAddCircleOutline} from 'react-icons/io'
import {MdEdit} from 'react-icons/md'

import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductListScreen = ({history}) => {
    //set dispatch
    const dispatch = useDispatch()

    //select productList state
    const productList = useSelector(state => state.productList)
    //destructure state
    const {loading, error, products} = productList

    //select productDelete state
    const productDelete = useSelector(state => state.productDelete)
    //destructure state
    const {loading:deleteLoading, error: deleteError, success: deleteSuccess} = productDelete


    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {    
        if(userInfo && userInfo.isSystemAdmin){
            dispatch(listProducts())
        }
        else{
            history.push("/accessdenied")
        }     
    },[dispatch, history, userInfo, deleteSuccess])


    //delete user
    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you would like to delete this product?")){
            dispatch(deleteProduct(id))
        }
        
    }

    //create user
    const createProductHandler = (product) => {
        console.log("create product")
    }

    return (
        <section>
            <h1>Products</h1>
            {// loading while performing delete action
                deleteLoading && <Loader />
            }
            {//error when deleting
                deleteError && <Message variant="danger">{deleteError}</Message>                  
            }
            { /*show loader if loading */
            loading ? <Loader />
                /*else if an error occured, display error message */
                : error ? <Message variant="danger">{error}</Message>
                /*else show page content */
                : ( <>
                    <div className="d-flex flex-row-reverse mb-3"> 
                        <LinkContainer to="admin/user/add">
                            <Button variant="outline-success" onClick={createProductHandler}>
                                <IoMdAddCircleOutline className="me-2 mb-1 fs-5"/>Add Product 
                            </Button>    
                        </LinkContainer>                        
                    </div>
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
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant="outline-success"   className="btn-icon me-2"><MdEdit/></Button>
                                        </LinkContainer>
                                        
                                        <Button variant="outline-danger"  className="btn-icon" onClick={() => deleteHandler(product._id)}><IoTrashSharp /></Button>
                                    </td>
                                        
                                </tr>
                            ))}
                           
                            
                        </tbody>

                    </Table>
                    </>
                )}
            
        </section>
    )
}

export default ProductListScreen
