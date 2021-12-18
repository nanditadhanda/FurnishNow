import React, {useEffect, useState} from 'react'


//Redux imports
import { useDispatch, useSelector } from 'react-redux'

//import constant
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'
import { CATEGORY_CREATE_RESET, CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'

//UI components
import {Tabs, Tab, Row, Col, Container} from 'react-bootstrap'

import CategoryTab from '../components/CategoryTab'
import ProductTab from '../components/ProductTab'
import SideBar from '../components/SideBar'


const ManageCatalogScreen = ({history}) => {
    //set dispatch
    const dispatch = useDispatch()    

    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [searchPath, setSearchPath] = useState('')
    
    let keyword = history.location.search

    useEffect(() => { 
        
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo || (userInfo && !userInfo.isSystemAdmin && !userInfo.isStoreManager)){
            history.push("/accessdenied")
        } else{
            if(userInfo.isSystemAdmin){
                setSearchPath('admin/manageCatalog')
            } else{
                setSearchPath('store-manager/manageCatalog')
            }
        }

    },[dispatch, history, userInfo, keyword])

    //select categoryDelete state
    const categoryDelete = useSelector(state => state.categoryDelete)
    const {success: categoryDeleteSuccess, error: categoryDeleteError} = categoryDelete

    //get category create state
    const categoryCreate = useSelector(state => state.categoryCreate)
    const {success : categoryCreateSuccess} = categoryCreate

    
    //get category update state
    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const {success : updateCategorySuccess} = categoryUpdate
    
    const [timedMessage, setTimedMessage] = useState(false)

    useEffect(() => {

     if (categoryDeleteSuccess || categoryDeleteError || categoryCreateSuccess || updateCategorySuccess){
            setTimedMessage(true)
            timer()
        }
    
    }, [categoryDeleteSuccess, categoryDeleteError, categoryCreateSuccess, updateCategorySuccess , dispatch]);

    const timer = () => {
        const timer = setTimeout(() => {
            setTimedMessage(false)

            if(categoryCreateSuccess){                     
                dispatch({type: CATEGORY_CREATE_RESET}) 
            }
            if(updateCategorySuccess){
                 //reset previous update attempt
                dispatch({type: CATEGORY_UPDATE_RESET})
            }
        }, 2000);
        return () => clearTimeout(timer);
    }

    return (
        <Row className='w-100'>
            <SideBar activeTab="product"></SideBar>
            <Col>
                <Container className="pb-5 py-3">
                    <Tabs  className="my-4">

                        {/* Staff Accounts List Tab */}
                            {/* Customer Accounts List Tab */}
                        <Tab eventKey="categories" title="Categories" > 
                            <div className=" my-5">                                            
                                <CategoryTab userInfo={userInfo} history={history} searchPath={searchPath} timedMessage={timedMessage} timer={timer}/>  
                            </div>                     
                        </Tab>
                        <Tab eventKey="products" title="Products">                                        
                            <div className=" my-5">   
                                <ProductTab userInfo={userInfo} searchPath={searchPath} history={history} keyword={keyword}/>
                            </div>            
                        </Tab>
                    </Tabs>     
                </Container>            
            </Col>
        </Row>      
    )
}

export default ManageCatalogScreen
