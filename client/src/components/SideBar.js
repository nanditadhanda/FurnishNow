import React , {useState, useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Col, Nav } from 'react-bootstrap'

//icons
import {MdPerson} from 'react-icons/md'
import { RiMoneyDollarBoxLine, RiDashboardFill} from 'react-icons/ri'
import {BiLogOutCircle, BiPackage} from 'react-icons/bi'
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
        <Col md={3} xl={2} className="px-0 bg-light position-relative" >    
            <Nav className="flex-column py-2 nav-side sticky-top" variant="pills" style={{'top':'60px'}}>   
                <Nav.Link href={userType+"/dashboard"} className="px-4 " active={activeTab === "dashboard"}>
                    <RiDashboardFill className="fs-3 pe-2 ms-1 mb-1 "/>Dashboard
                </Nav.Link>
                {userInfo && userInfo.isSystemAdmin ? (
                    <Nav.Link href="/admin/userlist" active={activeTab === "user"} className="px-4 ">
                        <FiUsers className="fs-3 pe-2 ms-1 mb-1 "/>Users
                    </Nav.Link>
                ) : 
                    <Nav.Link href="/store-manager/customers" active={activeTab === "user"} className="px-4 ">
                        <FiUsers className="fs-3 pe-2 ms-1 mb-1 "/>Customers
                    </Nav.Link>
                }
                <Nav.Link href={userType+"/manageCatalog"} active={activeTab === "product"} className="px-4 ">
                    <BiPackage className="fs-2 pe-2 mb-1 "/>Catalog
                </Nav.Link>
                <Nav.Link href={userType+"/orderlist"} active={activeTab === "order"} className="px-4 ">
                    <RiMoneyDollarBoxLine className=" fs-2 pe-2 mb-1 "/>Orders
                </Nav.Link>
                <Nav.Link href={userType+"/reports"} active={activeTab === "report"} className="px-4 ">
                    <GoGraph className=" fs-3 pe-2 ms-1 mb-1 "/>Reports
                </Nav.Link>
                <hr className="m-0"/>
                <Nav.Link href="/profile" className="px-4 " active={activeTab === "profile"}>
                    <MdPerson className=" fs-3 pe-2 ms-1 mb-1 "/>My Profile
                </Nav.Link>
                <hr className="m-0"/>
                <Nav.Link onClick={logoutHandler} className="px-4 ">
                    <BiLogOutCircle className="fs-2 pe-2 mb-1 "/>Logout
                </Nav.Link>                          
            </Nav>     
        </Col>
    )
}

export default SideBar
