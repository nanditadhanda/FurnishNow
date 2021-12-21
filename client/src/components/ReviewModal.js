import React, {useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import {Modal, Button} from 'react-bootstrap'

import Review from './Review'
const ReviewModal = ({item, order}) => {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    const productCreateReview = useSelector(state => state.state)
    const {success} =  productCreateReview

    useEffect(() => {
        if(productCreateReview && success){
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
            setShow(false)

        }      
    }, [dispatch, success, productCreateReview])

    return (
        <div>

            <Button variant="outline-success" className="btn" type='button' onClick={handleShow}  >Rate</Button>


            <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>    
                <div className="d-flex justify-content-between w-100">
                    <h5 className="m-0">{item.name}</h5>
                    <h5 className="m-0 pe-2 text-success">RM {item.salePrice}</h5>  
                </div>
            </Modal.Header>
            <Modal.Body>      
                <Review product_id={item.product} order={order} itemID={item._id}/>
            </Modal.Body>
            <Modal.Footer >
                <Button onClick={handleClose}>Close</Button>  
            </Modal.Footer>
        </Modal>
            
        </div>
    )
}

export default ReviewModal
