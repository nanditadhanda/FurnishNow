import React, {useState, useEffect} from 'react'

//axios
import axios from 'axios'

//Routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import product details action
import {listProductDetails, updateProduct } from '../actions/productActions'
//Import category details action
import {listCategories } from '../actions/categoryActions'


//constants
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'

//UI components
import {Form, Row, Col, Button, FloatingLabel, Container} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import SideBar from '../components/SideBar'

//icons
import { IoArrowBack } from 'react-icons/io5'

const ProductEditScreen = ({match, history}) => {
    //get id passed in URL
    const productID = match.params.id

    //set default local states
    const [productName, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [category_id, setCategoryID] = useState('')
    const [description, setDescription] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [model3D, setModel3D] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [costPrice, setCostPrice] = useState(0.00)
    const [salePrice, setSalePrice] = useState(0.00)
    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState('')
    const [file3D, setFile3D] = useState('')

    const [message, setMessage] = useState('')
    const [valError, setValError] = useState(false)

    //define dispatch
    const dispatch = useDispatch()

    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    //get productDetails state
    const productDetails = useSelector(state => state.productDetails)
    //destructure state
    const { error, loading, product} = productDetails

    //get category state
    const categoryList = useSelector(state => state.categoryList)
    const {categories} = categoryList
    


    //get productUpdate state
    const productUpdate = useSelector(state => state.productUpdate)
    //destructure state
    const { error: updateError, loading:updateLoading, success:updateSuccess} = productUpdate


    //use effect react hook
    useEffect(() => {

        console.log(file)

        //authenticate and check if user is logged in and whether they are System Admin
        if(userInfo && userInfo.isStoreManager){

            //if information updated, reset productUpdate state and redirect to product list page
            if(updateSuccess){
                setMessage('Product Updated Successfully')
                dispatch({type: PRODUCT_UPDATE_RESET})
                // history.push("/store-manager/productList")
            }
            //else - information not updated
            else{            
            
                //if no product data found in state or if product id doesn't match the id passed in, retrieve product data
                if(!product || product._id !== Number(productID)){
                   dispatch(listProductDetails(productID))
                }
                //if user data is present in state, set values of local states
                else{
                    //reset previous update attempt
                    dispatch({type: PRODUCT_UPDATE_RESET})

                    //set local states                    
                    setName(product.name)
                    setBrand(product.brand)
                    setCategory(product.category_id)
                    setDescription(product.description)
                    setImagePath(product.image)
                    
                    setModel3D(product.model3D)
                    setCountInStock(product.countInStock)
                    setCostPrice(product.costPrice)
                    setSalePrice(product.salePrice)
                }
            }
                
        }
        //if not authorized user , redirect to login page
        else{
             history.push("/accessdenied")
        }
     
    }, [categoryList, dispatch, userInfo, updateSuccess, product, productID, history, file])

    const submitHandler = (e) => {
        //prevent refresh or redirect to another page
        e.preventDefault()

       //validations
        if(productName === '' || brand === "" || costPrice === '' || salePrice === '' || countInStock === ''){
            setValError(true)
            setMessage("Error: Please fill out all required fields")

            setCostPrice(0.00)
            setSalePrice(0.00)
            setCountInStock(0)
        
        }
        //if incorrect 3D model or incorrect image extension
        else if((file3D !== "" &&  typeof(file3D) != 'undefined' && file3D.name.split('.').pop() !== 'glb') 
            || (file !== "" && typeof(file) != 'undefined' && (file.name.split('.').pop() !== 'jpg' 
            || file.name.split('.').pop() !== 'png'))) {
            setFile('')
            setFile3D('')
            setValError(true)      
            setMessage("Error: Incorrect file format uploaded. Acceptable image extensions: '.jpg', '.png'. Acceptable 3D model formats: '.glb'")
        }
        else if(isNaN(parseFloat(costPrice))
                 || isNaN(parseFloat(salePrice))
                 || isNaN(parseInt(countInStock))){
            setValError(true)      
            setMessage("Error: Incorrect number format")
        }
        else if (costPrice < 0 || salePrice < 0 || countInStock < 0){
            setValError(true) 
            setMessage("Error: Currency or Count in Stock values cannot be negative")
        }
        else{
            setValError(false)
            setMessage('')

            if(file !== "" || file3D !== ""){
                uploadFileHandler()
                setFile('')
                setFile3D('')
            } 
            dispatch(updateProduct({
                _id: productID,
                name: productName,
                brand,
                category,
                description,
                // model3D,
                countInStock,
                costPrice,
                salePrice
            }))

        }

        

       // 
    }

    // function to upload images
    const uploadFileHandler = async (e) => {

        //get file passed in
       // const file = e.target.files[0]

        //create FormData() function
        const formData = new FormData()

        //add file + product ID to FormData function (same names as backend variables)

        if(file !== null ){
            formData.append('image', file)
        }
        if(file3D !== null){
            formData.append('model3D', file3D)
        }    
        formData.append('product_id', productID)

        //set uploading to true
        setUploading(true)

        //upload image to backend - send POST request
        try{
            //configure headers
            const config = {
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            }

            //send POST request
            const {data} = await axios.post(
                '/api/products/upload-file', 
                formData,
                config
            )

            //set uploading to true
            setUploading(false)

        }
        catch(error){
            //set uploading to false
            setUploading(false)

        }
    }

    //function to update category
    const selectCategoryHandler = (e) => {
        e.preventDefault()
        const value = e.target.value        
        setCategory(value)
    }


    // displayed to user
    return (

        <Row className='w-100'>
            <SideBar activeTab="product" />
            <Col>
                <Container className="py-5">
                    <Row>
                        <Col lg={7}>
                            <Link to="/store-manager/productList">
                                <Button variant="outline-secondary"><IoArrowBack /> Back</Button>
                            </Link>
                        </Col>

                    </Row>               
                    
                    <FormContainer title="Edit Product" lg="7"  shadow="shadow-sm">
                        {/* If loading when updated */}
                        {updateLoading && <Loader/>}

                        {/* if any error while updating */}
                        {updateError && <Message variant="danger" dismissable="true">Error:{updateError}</Message>}

                        {/* If data is still loading (not update instance), show loader */}
                        {loading ? <Loader />
                            //if error is encountered, show error message
                            : error ? <Message variant="danger">Error: {error}</Message>
                                //if error is encountered, show error message
                                : (
                                <>
                                {message && <Message variant={valError? "danger" : "success"}>{message}</Message>}
                                <Form onSubmit={submitHandler}>
                                    {/* User Edit Form */}
                                    <Row>
                                        <Col  xs="12" >
                                            {/* productName Field */}
                                            <Form.Group controlId="productName" className="pb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text" 
                                                    value={productName} onChange={(e) => setName(e.target.value)}/>
                                            </Form.Group>
                                        </Col>                                     
                                        
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="6">
                                            {/* Category */}
                                            <Form.Group id="category" className="pb-3">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Select aria-label="Category" defaultValue={product.category_id} onChange={selectCategoryHandler}>
                                                    {categories !=='' && (categories.map((category)=> (
                                                        <option 
                                                            key={category.id}
                                                            value={category.id}
                                                            selected={category === category.id} >
                                                            
                                                            {category.name}
                                                        </option>
                                                    )))}                                            
                                                </Form.Select> 
                                                
                                            </Form.Group>    
                                        </Col>
                                        <Col md="6" xs="12">
                                            {/* Brand Field */}
                                            <Form.Group controlId="brand" className="pb-3">
                                                <Form.Label>Brand</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={brand} onChange={(e) => setBrand(e.target.value)}/>
                                            </Form.Group>       
                                        </Col>
                                        
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="6" lg="4">
                                            {/* Count In Stock */}
                                            <Form.Group controlId="countInStock" className="pb-3">
                                                <Form.Label>Count In Stock</Form.Label>
                                                <Form.Control 
                                                    type="number" 
                                                    value={countInStock} onChange={(e) => setCountInStock(e.target.value)}/>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="12" md="6" lg="4">
                                            {/* Cost Price */}
                                            <Form.Group controlId="costPrice" className="pb-3">
                                                <Form.Label>Cost Price</Form.Label>
                                                <Form.Control
                                                    label="Cost Price" 
                                                    type="number" 
                                                    value={costPrice} onChange={(e) => setCostPrice(e.target.value)}/>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="12" md="6" lg="4">
                                            {/* Sale Price */}
                                            <Form.Group controlId="salePrice" className="pb-3">
                                                <Form.Label>Sale Price</Form.Label>
                                                <Form.Control                                            
                                                    type="number" 
                                                    value={salePrice} onChange={(e) => setSalePrice(e.target.value)}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>  
                                                                    
                                        <Col >
                                            <Form.Group className="pb-4">                                      
                                                <Form.Label>Product Image</Form.Label>
                                                <Form.Control 
                                                    readOnly
                                                    className="mb-2"
                                                    type="text" 
                                                    value={imagePath} 
                                                    onChange={(e) => setImagePath(e.target.value)}/> 
                                                
                                                <Form.Control 
                                                    type="file"
                                                    id="image-file"
                                                    label="Select File"
                                                    custom
                                                    onChange={(e) => setFile(e.target.files[0])}
                                                />
                                                {/* if image is uploading */}
                                                {uploading && <Loader />}
                                            
                                            </Form.Group> 
                                                
                                        </Col>
                                        
                                    </Row>
                                    <Row>  
                                                                    
                                        <Col >
                                            <Form.Group className="pb-4">                                      
                                                <Form.Label>3D Model</Form.Label>
                                                <Form.Control 
                                                    readOnly
                                                    className="mb-2"
                                                    type="text" 
                                                    value={model3D} 
                                                    onChange={(e) => setModel3D(e.target.value)}/> 
                                                
                                                <Form.Control 
                                                    type="file"
                                                    id="model3D-file"
                                                    label="Select File"
                                                    custom
                                                    className='mb-2'
                                                    onChange={(e) => setFile3D(e.target.files[0])}
                                                />
                                                <small>Note: Please upload 3D model with .glb extension only</small>
                                                {/* if image is uploading */}
                                                {uploading && <Loader />}
                                            
                                            </Form.Group> 
                                                
                                        </Col>
                                        
                                    </Row>
                    
                                    <Row>
                                        <Col xs="12">
                                            {/* Description */}
                                            <FloatingLabel controlId="desciption" className="pb-3" label="Description" >
                                                <Form.Control
                                                    style={{ height: '100px' }}                                            
                                                    as="textarea" 
                                                    value={description} onChange={(e) => setDescription(e.target.value)}/>
                                            </FloatingLabel>

                                        </Col>
                                    </Row>
                                    
                                    {/* Submit Button */}
                                    <div className="d-grid">
                                        <Button type="submit" variant="primary" className="my-3">Update</Button>
                                    </div>  
                                </Form>
                                </>
                            )}
                    </FormContainer>
                </Container>
            </Col>
        </Row>

        
    )
}

export default ProductEditScreen
