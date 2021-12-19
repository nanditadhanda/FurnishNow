import React from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { Card, Row, Col, ListGroup, Image, Table, Button } from 'react-bootstrap'

const OrderCard = ({order}) => {
    return (
       <Card className="my-4 shadow-sm"> 
            <Card.Header className="d-flex justify-content-between">
                <small className="">Order ID: {order._id}</small>   
                <small>Status: <span className="text-success">Order {order.orderStatus}</span></small>
            </Card.Header>

            <Row>
                <Col className="">
                    <ListGroup variant="flush" className="pe-1 ps-2 py-2">
                        <ListGroup.Item>
                            <h6>Order Items: </h6>
                        </ListGroup.Item>
                    {/* Map out items in order */}
                    {order.orderItems.map((item, index) => (
                        <ListGroup.Item key="index">
                            <Row>
                                {/* Product Image */}
                                <Col md={2} xs={3}>
                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                </Col>
                                {/* Product Name */}
                                <Col>
                                    {item.name}
                                    <br/>    
                                    <span className="text-secondary">{item.qty} x RM {item.price}</span>
                                </Col>
                                {/* Quantity and Price */}
                                <Col md={4} className="text-success text-right">
                                    RM {(parseFloat(item.qty * item.price)).toFixed(2)}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                </Col>

                    <Col md={4} className="border-start px-4 py-3">
                    <Table>
                        <tr>
                            <td><h6 className="p-0">Order Date:</h6></td>
                            <td className="text-right">{order.orderDate.substring(0, 10)}</td>
                        </tr>
                        <tr>
                            <td><h6 className="p-0"> Order Total:</h6></td>
                            <td className="text-right">RM {order.totalPrice}</td>
                        </tr>
                        <tr >
                            <td colSpan="2">
                                <LinkContainer to={`/order/${order._id}`}>
                                    <div className="d-grid px-0 mt-3 my-1">
                                        <Button variant="outline-success"  type='button'>View Order</Button>
                                    </div>
                                </LinkContainer>
                                
                            </td>
                        </tr>
                    </Table>
                </Col>
                
            </Row>  
        </Card>
    )
}

export default OrderCard
