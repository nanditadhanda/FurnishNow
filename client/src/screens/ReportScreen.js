import React, {useEffect, useState} from 'react'

import { useSelector, useDispatch } from 'react-redux'

//Import action
import { getTotalValues , getCategorySales, getMonthlySales} from '../actions/reportActions'


//UI components
import SideBar from '../components/SideBar'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import BarChart from '../components/BarChart'
import BarChartGrouped from '../components/BarChartGrouped'
// import AreaChart from '../components/AreaChart'
import GraphChart from '../components/GraphChart'

import {Container, Row, Col, Card, Form, Table} from 'react-bootstrap'

import {MdOutlinePendingActions} from 'react-icons/md'
import  {AiOutlineFileDone} from 'react-icons/ai'
import {BiPackage} from 'react-icons/bi'

const ReportScreen = ({history}) => {
    //define necessary hooks
    const dispatch = useDispatch()

    //---------access control check--------------//

    // 1. select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

     //2. access control effect function
    useEffect(() => {    
        if(userInfo && (userInfo.isSystemAdmin || userInfo.isStoreManager)){ 
            //get report data
            dispatch(getTotalValues())
            dispatch(getCategorySales())
            dispatch(getMonthlySales())
        }
        else{
            history.push("/accessdenied")
        }  

    },[dispatch, history, userInfo])

    //------------ Totals ---------------//

    const reportTotals = useSelector(state => state.reportTotals)
    const {error:errorTotals, loading:loadingTotals, data : dataTotal} = reportTotals

    //------------ Category Sales Redux State ---------------//
    const reportCategorySales = useSelector(state => state.reportCategorySales)
    const {error:errorCategorySales, loading:loadingCategorySales, data : dataCategorySales} = reportCategorySales

    // states for data retrieved
    const [totalItems, setTotalItems] = useState('')
    const [totalSales, setTotalSales] = useState('')
    const [avgSales, setAvgSales] = useState('')
    const [categoryLabels, setCategoryLabel] = useState('')

    const [itemsDataSet, setItemsDataset] = useState('')
    const [revenueDataSet, setRevenueDataset] = useState('')

    useEffect(() => {
        if(dataCategorySales){   
            //set data retrieved into local arrays
            setCategoryLabel(dataCategorySales.map(item => item.category.name))
            setItemsDataset(dataCategorySales.map(item => item.items))
            setRevenueDataset(dataCategorySales.map(item => item.totalSales))
            
            //calculate total items, total sales, and total average sales
            setTotalItems(dataCategorySales.reduce((a,v) =>  a = a + v.items , 0 ))
            setTotalSales((dataCategorySales.reduce((a,v) =>  a = a + parseFloat(v.totalSales) , 0 )).toFixed(2))
            setAvgSales((dataCategorySales.reduce((a,v) =>  a = a + parseFloat(v.average) , 0 )).toFixed(2))
        }
    }, [dataCategorySales])

    //------------ Monthly Sales Redux State ---------------//
    const reportMonthlySales = useSelector(state => state.reportMonthlySales)
    const {error:errorMonthlySales, loading:loadingMonthlySales, data : dataMonthlySales} = reportMonthlySales


    // states for data retrieved
    const [totalOrders, setTotalOrders] = useState('')
    const [totalPending, setTotalPending] = useState('')
    const [totalShipped, setTotalShipped] = useState('')
    const [totalCompleted, setTotalCompleted] = useState('')
    const [totalSalesMonthly, setTotalSalesMonthly] = useState('')

    const [avgSalesMonthly, setAvgSalesMonthly] = useState('')
    const [monthLabel, setMonthLabel] = useState('')
    const [grossSalesDataSet, setGrossSalesDataset] = useState('')

    const [pendingDataSet, setPendingDataSet] = useState('')
    const [shippedDataSet, setShippedDataSet] = useState('')
    const [groupedDataSet, setGroupedDataSet] = useState('')
    const [ordersDataSetLabel, setOrdersDataSetLabel] = useState('')
    const [completedDataSet, setCompletedDataSet] = useState('')

    useEffect(() => {
        if(dataMonthlySales){   
            //set data retrieved into local arrays
            setMonthLabel(dataMonthlySales.map(item => item.month))
            setGrossSalesDataset(dataMonthlySales.map(item => item.netSales))       
            setPendingDataSet(dataMonthlySales.map(item => item.pendingOrders))
            setShippedDataSet(dataMonthlySales.map(item => item.shippedOrders))
            setCompletedDataSet(dataMonthlySales.map(item => item.completedOrders))
            setOrdersDataSetLabel([ 'Pending Orders', 'Shipped Orders', 'Completed Orders'])

            //calculate total items, total sales, and total average sales
            setTotalOrders(dataMonthlySales.reduce((a,v) =>  a = a + v.totalOrders , 0 ))
            setTotalPending(dataMonthlySales.reduce((a,v) =>  a = a + v.pendingOrders , 0 ))
            setTotalShipped(dataMonthlySales.reduce((a,v) =>  a = a + v.shippedOrders , 0 ))
            setTotalCompleted(dataMonthlySales.reduce((a,v) =>  a = a + v.completedOrders , 0 ))
            setTotalSalesMonthly((dataMonthlySales.reduce((a,v) =>  a = a + parseFloat(v.netSales) , 0 )).toFixed(2))
            setAvgSalesMonthly((dataMonthlySales.reduce((a,v) =>  a = a + parseFloat(v.avgSales) , 0)).toFixed(2))
        }
    }, [dataMonthlySales])

    //set grouped dataset
    useEffect(() => {
        if(pendingDataSet !=='' && shippedDataSet!=='' && completedDataSet !== ''){
            setGroupedDataSet([
                pendingDataSet,
                shippedDataSet,
                completedDataSet
            ])
        }   
    },[pendingDataSet, shippedDataSet, completedDataSet])

   
    return (
        <Row className="w-100">
            <SideBar activeTab="report"/>
            <Col>
                <main>
                    <Container className="py-5">
                        <h1 className="pb-5">Report</h1>
                        
                        {/*     total order values */}
                        {loadingTotals ? <Loader />
                        : errorTotals ? <Message variant="danger">{errorTotals}</Message>
                        : dataTotal &&
                        <Row>
                            <Col md={4}>
                                <Card className="bg-info text-white p-4">
                                    <div className='d-flex'>
                                        <BiPackage className='display-3 text-white'/>
                                        <div className='ms-3'>
                                            <h6>Total Orders: </h6>
                                            <div className='mb-0 h1'>{dataTotal.total}</div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="bg-success text-white p-4">
                                     <div className='d-flex'>
                                        <AiOutlineFileDone className='display-3'/>
                                        <div className='ms-3'>
                                            <h6>Orders Fullfilled: </h6>
                                            <h1 className='mb-0'>{dataTotal.completedOrders}</h1>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            
                            <Col md={4}>
                                <Card className="bg-primary text-white  p-4">
                                    <div className='d-flex'>
                                        <MdOutlinePendingActions className='display-3'/>
                                        <div className='ms-3'>
                                            <h6>Orders Pending: </h6>
                                            <h1 className='mb-0'>{dataTotal.pendingOrders}</h1>
                                        </div>
                                    </div>
                                </Card>
                            </Col>                            
                        </Row>
                        }

                        {/* Category Sales Report Data */}
                        <Card  className="my-5">
                            <Card.Body>
                                <h4 className='py-3'>Sales By Category</h4>
                                <Row>
                                    <Col>
                                        <Form>
                                            <Row>

                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                                {loadingCategorySales ? <Loader />
                                    : errorCategorySales ? <Message variant="danger">{errorCategorySales}</Message>
                                    : dataCategorySales &&

                                    <>
                                    <Row>
                                        <Col>
                                            <Table responsive >                                    
                                                <thead>
                                                    <tr>
                                                        <th className="bg-light">Category</th>
                                                        <th>Items Sold</th>
                                                        <th>Net Sales</th>
                                                        <th>Average Net Sales</th>
                                                    </tr>
                                                </thead>
                                                <thead>
                                                    {dataCategorySales.map((dataset, index) =>(
                                                        <tr key={index}>
                                                            <td className="bg-light">{dataset.category.name}</td>
                                                            <td>{dataset.items}</td>
                                                            <td>{dataset.totalSales}</td>
                                                            <td>{dataset.average}</td>
                                                        </tr>
                                                    ))
                                                    }
                                                    
                                                </thead>
                                                <tfoot className='bg-light fw-bold'>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td>{totalItems}</td>
                                                        <td>RM {totalSales}</td>
                                                        <td>RM {avgSales}</td>
                                                    </tr>
                                                </tfoot>
                                            </Table> 
                                        </Col>
                                    </Row>
                                    <Row className="py-5">
                                        <Col md='6'>
                                            <h4 className="mb-4">Items Sold By Category</h4>
                                            <GraphChart type="bar" color='info' labels={categoryLabels} datasetLabel='# of items sold' data={itemsDataSet}/>         
                                        </Col>
                                        <Col md='6'> 
                                            <h4 className="mb-4">Net Revenue By Category</h4>
                                            <GraphChart type="bar" color='primary' labels={categoryLabels} datasetLabel='Revenue Generated' data={revenueDataSet}/>
                                        </Col>
                                    </Row>
                                </>}
                            </Card.Body>
                        </Card>
                        
                        <Card className="my-5">
                            <Card.Body>
                                <h4 className='py-3'>Monthly Orders</h4>

                                {loadingMonthlySales ? <Loader />
                                    : errorMonthlySales ? <Message variant="danger">{errorMonthlySales}</Message>
                                    : dataMonthlySales &&

                                    <>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th className="bg-light">Month</th>
                                                    <th>Total Orders</th>
                                                    <th>Pending Orders</th>
                                                    <th>Shipped Orders</th>
                                                    <th>Completed Orders</th>
                                                    <th>Gross Sales*</th>
                                                    <th>Gross Average Sales</th>
                                                </tr>               
                                            </thead>
                                            <tbody>
                                                {dataMonthlySales.map((data, index)=>(
                                                    <tr key={index}>
                                                        <td className="bg-light">{data.month}</td>
                                                        <td>{data.totalOrders}</td>
                                                        <td>{data.pendingOrders}</td>
                                                        <td>{data.shippedOrders}</td>
                                                        <td>{data.completedOrders}</td>
                                                        <td>{data.netSales}</td>
                                                        <td>{data.avgSales}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                            <tfoot>
                                                <tr className="bg-light">
                                                    <th>TOTAL</th>
                                                    <th>{totalOrders}</th>
                                                    <th>{totalPending}</th>
                                                    <th>{totalShipped}</th>
                                                    <th>{totalCompleted}</th>
                                                    <th>{totalSalesMonthly}</th>                                                    
                                                    <th>{avgSalesMonthly}</th>
                                                </tr>
                                            </tfoot>
                                        </Table>
                                        <small>* Sales figures include tax and other expenses calculated</small>

                                        <Row className="py-5">
                                            <Col md="6">
                                                <h4 className='py-3'>Monthly Orders Progress</h4>
                                                <BarChartGrouped type="line" color='success' labels={monthLabel} datasetLabel={ordersDataSetLabel} data={groupedDataSet}/>   

                                            </Col>
                                            <Col md="6">
                                                <h4 className='py-3'>Monthly Gross Sales</h4>
                                                <GraphChart type="line" color='success' labels={monthLabel} datasetLabel='Revenue Generated' data={grossSalesDataSet}/>                                                
                                            </Col>
                                        </Row>

                                    </>}
                            </Card.Body>
                        </Card>
                        
                        

                    </Container>
                </main>
            </Col>
            
        </Row>
    )
}

export default ReportScreen
