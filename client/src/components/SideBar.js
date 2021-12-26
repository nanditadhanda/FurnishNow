import React , {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Col, Nav } from 'react-bootstrap'

//icons
import {MdPerson, MdMenuBook} from 'react-icons/md'
import { RiMoneyDollarBoxLine, RiDashboardFill} from 'react-icons/ri'
import {BiLogOutCircle} from 'react-icons/bi'
import {GoGraph} from 'react-icons/go'
import {FiUsers} from 'react-icons/fi'

//logout action
import {logout} from '../actions/userActions'


const SideBar = ({activeTab}) => {
    const [userType, setUserType] = useState('')

    /*-------- logged in user info ----------*/

    //userLogin state
    const userLogin = useSelector(state => state.userLogin)
    //destructure state
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
            if(userInfo.isStoreManager){
               setUserType("/store-manager")
            }
            if(userInfo.isSystemAdmin){
                setUserType("/admin")
            }
        }
    }, [userInfo])

    //logout handler
    //create dispatch
    const dispatch = useDispatch()
    const history = useHistory()

    //logout handler function
    const logoutHandler = () => {
        dispatch(logout())
        history.push("/login");
    }   
    return (
        <Col md={3} xl={2} className="px-0 bg-light position-relative shadow d-none d-lg-block" style={{'z-index': '0'}} >    
            <Nav className="flex-column py-2 nav-side sticky-top" variant="pills" style={{'top':'60px'}}>   
                <LinkContainer to={userType+"/dashboard"}>
                    <Nav.Link  className="px-4 " active={activeTab === "dashboard"}>
                        <RiDashboardFill className="fs-3 pe-2 ms-1 mb-1 "/>Dashboard
                    </Nav.Link>
                </LinkContainer>
                {userInfo && userInfo.isSystemAdmin ? (
                    <LinkContainer to="/admin/userlist">
                        <Nav.Link active={activeTab === "user"} className="px-4 ">
                            <FiUsers className="fs-3 pe-2 ms-1 mb-1 "/>Users
                        </Nav.Link>                    
                    </LinkContainer>
                    
                ) : 
                    <LinkContainer to="/store-manager/customers">
                        <Nav.Link active={activeTab === "user"} className="px-4 ">
                            <FiUsers className="fs-3 pe-2 ms-1 mb-1 "/>Customers
                        </Nav.Link>            
                    </LinkContainer>
                    
                }
                <LinkContainer to={userType+"/manageCatalog"}>
                    <Nav.Link active={activeTab === "product"} className="px-4 ">
                        <MdMenuBook className="fs-2 pe-2 mb-1 "/>Catalog
                    </Nav.Link>                
                </LinkContainer>
                <LinkContainer to={userType+"/orderlist"}>
                    <Nav.Link  active={activeTab === "order"} className="px-4 ">
                        <RiMoneyDollarBoxLine className=" fs-2 pe-2 mb-1 "/>Orders
                    </Nav.Link>   
                </LinkContainer>
                <LinkContainer to={userType+"/reports"}>
                    <Nav.Link active={activeTab === "report"} className="px-4 ">
                        <GoGraph className=" fs-3 pe-2 ms-1 mb-1 "/>Reports
                    </Nav.Link>       
                </LinkContainer>
                
                <hr className="m-0"/>
                
                <LinkContainer to="/profile">
                    <Nav.Link className="px-4 " active={activeTab === "profile"}>
                        <MdPerson className=" fs-3 pe-2 ms-1 mb-1 "/>My Profile
                    </Nav.Link>
                </LinkContainer>
                
                <hr className="m-0"/>
                <Nav.Link onClick={logoutHandler} className="px-4 ">
                    <BiLogOutCircle className="fs-2 pe-2 mb-1 "/>Logout
                </Nav.Link>                          
            </Nav>         
        </Col>
    )
}

export default SideBar
