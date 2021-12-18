import React, {useEffect, useState} from 'react'

//Routing
import { LinkContainer } from 'react-router-bootstrap'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'

//Import relavant product action
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'

//import hooks 
import Sort from '../functions/Sort'

//UI components
import {Table, Button} from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Search from '../components/Search'

//icons
import { IoTrashSharp } from 'react-icons/io5'
import {IoMdAddCircleOutline} from 'react-icons/io'
import {MdEdit} from 'react-icons/md'
import { AiFillEye} from 'react-icons/ai'
import {HiSortDescending, HiSortAscending} from 'react-icons/hi'

const ProductTab  = ({userInfo, searchPath, history, keyword}) => {

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


    //create product
    const createProductHandler = () => {
        dispatch(createProduct())
    }
    
    //delete product
    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you would like to delete this product?")){
            dispatch(deleteProduct(id))
        }        
    }

    //ordering and filter
    const [filter] = useState('')
    const [ordering, setOrdering] = useState('_id')

    const tableTitle = ['ID', 'Name', 'Brand', 'Category' , 'Price']
    let [sort] = useState(['_id' , 'name', 'brand', 'category__name', 'salePrice'])

    //set sorting feature
    const orderingHandler = (order, i) => {
        setOrdering(order)
        sort = Sort(order, i, sort)
    }

     useEffect(()=> {
         if(createSuccess){
            history.push(`/store-manager/product/${productCreated._id}/edit`)
        }
        else{            
            dispatch(listProducts(keyword, ordering, filter))
        }
    },[history, dispatch, ordering, filter, deleteSuccess, createSuccess, productCreated, sort, keyword])

    
    return (
        <>
            <h1 className="mb-4">Products</h1>
 
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
                                {tableTitle.map((title, index) => (
                                    <th key={index} 
                                        className={`table-sort-header
                                            ${(('-'+ordering) === sort[index] 
                                            || ordering === ('-'+sort[index])) 
                                            && "active"}`}>
                                        <Button onClick={()=>orderingHandler(sort[index], index)} className="d-flex justify-content-between align-items-center">
                                            {title}
                                            {/* ascending or descending icon based on neg/positive value */}
                                            {sort[index].substring(0,1) === '-' ?  <HiSortAscending/> : <HiSortDescending/> }
                                        </Button>     
                                    </th>
                                ))}
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
                    <Paginate path={`/${searchPath}`} page={page} pages={pages} keyword={keyword} type="products"/>
                    </>
                )}
        
        </>
    )
}


export default ProductTab
