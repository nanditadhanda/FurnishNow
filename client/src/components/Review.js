import React, { useState, useEffect} from 'react'
import {Button, Form} from 'react-bootstrap'

//import redux components
import {useDispatch, useSelector} from 'react-redux'

//import actions
import {createProductReview} from '../actions/productActions'

import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'

//import UI components
import Loader from '../components/Loader'
import Message from '../components/Message'


const Review = ({user, product_id, order, itemID}) => {
    //set initial states
    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState('')
    const [comment, setComment] = useState('')

    //set dispatch
    const dispatch = useDispatch()


    /*-------- product reviews ----------*/

    //retrieve productCreateReview state
    const productCreateReview = useSelector(state => state.productCreateReview)
    // //destructure state
     const { loading: loadingProductReview, error: errorProductReview, success: successProductReview} = productCreateReview

    //use effect
    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment('')
            setTitle('')   

            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        
        }

    }, [dispatch, successProductReview, rating])

    const reviewSubmitHandler = (e) => {
        e.preventDefault()
       
        dispatch(createProductReview(
            product_id,      
            {
                'order': order, 
                'itemID': itemID,
                title,
                rating,            
                comment
            }            
        ))
    }
    return (
        <>
            {loadingProductReview && <Loader />}
            {successProductReview && <Message variant="success">Product Review Submitted</Message>}
            {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
            <Form onSubmit={reviewSubmitHandler}>
                <Form.Label className="m-0 d-block">Rate Product</Form.Label> 
                <Form.Group controlId='rating' className=" stars"  onChange={(e) => setRating(e.target.value)}>              
                    <input value="5" inline name="rating" type="radio" id="rating5" /><label for="rating5" title="5 Stars"></label>
                    <input value="4" inline name="rating" type="radio" id="rating4" /><label for="rating4"></label>
                    <input value="3" inline name="rating" type="radio" id="rating3" /><label for="rating3"></label>
                    <input value="2" inline name="rating" type="radio" id="rating2" /><label for="rating2"></label>
                    <input value="1" inline name="rating" type="radio" id="rating1" /><label for="rating1"></label>
                </Form.Group>
                <Form.Group controlId='title' className="mb-3">
                    <Form.Label className="mb-1">Title</Form.Label> 
                    <Form.Control 
                        value={title}
                        type='text'  
                        onChange={(e) => setTitle(e.target.value)}                
                    />                
                </Form.Group>
                <Form.Group controlId='comment'>
                    <Form.Label className="mb-1">Review</Form.Label> 
                    <Form.Control 
                        value={comment}
                        as='textarea' 
                        row="5" 
                        onChange={(e) => setComment(e.target.value)}                
                    />                
                </Form.Group>
                <div className="d-grid">
                    <Button disabled={loadingProductReview} type="submit"
                        className="my-4" variant="outline-success">
                            Submit
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default Review
