import React, {useState, useEffect} from 'react'
import {Modal, Row, Col, Button, Image} from 'react-bootstrap'

import Review from './Review'
const ReviewModal = ({item, order}) => {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        if(item.review.length !== 0){                   
            setShow(false)       
        }      
    }, [item])

    return (
        <div>

            <Button variant="outline-success" className="btn" type='button' onClick={handleShow}  >Rate</Button>


            <Modal show={show} onHide={handleClose}
           
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>    
                <div className="d-flex justify-content-between w-100">
                    <h5 className="m-0">Leave A Rating</h5>
                </div>
            </Modal.Header>
            <Modal.Body>  
                <Row className="pb-3 p-2 mb-3 border-bottom">
                    <Col xs={3} lg={2}><Image fluid src={item.image}/></Col>
                    <Col>
                        <h5>{item.name}</h5>
                        <h6 className="text-success">RM {item.price}</h6>          
                    </Col>            
                </Row>  
                <Row className="p-2">
                    <Col>
                        <Review product_id={item.product} order={order} itemID={item._id}/>
                    </Col>
                </Row>  
                
            </Modal.Body>

        </Modal>
            
        </div>
    )
}

export default ReviewModal
