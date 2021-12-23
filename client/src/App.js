import React from 'react'

//routing and redirecting
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import ScrollToTop from './functions/ScrollToTop'

//import header-footer components
import Header from './components/Header'
import Footer from './components/Footer'

//import bootstrap components
import {Container} from 'react-bootstrap'
import Message from './components/Message'

//import app screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import MyOrderListScreen from './screens/myOrderListScreen'
import ManageUsersScreen from './screens/ManageUsersScreen'
import EditUserScreen from './screens/EditUserScreen'
import AuthorizationErrorScreen from './screens/AuthorizationErrorScreen'
import ManageCatalogScreen from './screens/ManageCatalogScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ManageOrdersScreen from './screens/ManageOrdersScreen'
import CatalogScreen from './screens/CatalogScreen'
import AddUserScreen from './screens/AddUserScreen'
import AddEditCategoryScreen from './screens/AddEditCategoryScreen'
import ReportScreen from './screens/ReportScreen'
import CustomerDetailScreen from './screens/CustomerDetailScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import ContactScreen from './screens/ContactScreen'
import PrivacyScreen from './screens/PrivacyScreen'
import TnCScreen from './screens/TnCScreen'
import DashboardScreen from './screens/DashboardScreen'


const NoMatchPage = () => {
  return (
    <Container className="py-5">
      <h3 className="mb-4">404 - Page not found</h3>
      <Message variant="warning">Oops! The page you are requesting for is not found. <Link to="/">Go To Home</Link></Message>
    </Container>
  );
};

function App() {
  return (
    
    <Router>
      {/* Header component*/}
      <Header />
      {/* app body screens*/}
      <main >
        {/* register routing to different screens based on URL path */}
        <ScrollToTop>
            <Switch>
              {/* paths without logging in */}     
              <Route path="/" component={HomeScreen} exact/>            
              <Route  path="/products/:category" component={CatalogScreen}/>        
              <Route  path="/product/:category/:id" component={ProductScreen}/>

              {/* User account screens */}
              <Route path="/login" component={LoginScreen}/>
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen}/>

              {/* Order and cart screens */}
              <Route  path="/cart" component={CartScreen}/>
              <Route  path="/shipping" component={ShippingScreen}/>
              <Route  path={`/placeorder`} component={PlaceOrderScreen}/>
              <Route  path="/my-orders" component={MyOrderListScreen}/>
              <Route  path="/order/:id" component={OrderScreen}/>
              
              {/* Store Manager Screens */}
              <Route  path="/store-manager/dashboard" component={DashboardScreen}/>
              <Route  path="/store-manager/manageCatalog" component={ManageCatalogScreen}/>
              <Route  path="/store-manager/category/add" component={AddEditCategoryScreen}/>     
              <Route  path="/store-manager/category/:slug/edit" component={AddEditCategoryScreen}/>
              <Route  path="/store-manager/product/:id/edit" component={ProductEditScreen}/>         
              <Route  path="/store-manager/customers" component={ManageUsersScreen}/>       
              <Route  path="/store-manager/customer/:id" component={CustomerDetailScreen}/>
              <Route  path="/store-manager/orderlist" component={ManageOrdersScreen}/>
              <Route  path="/store-manager/reports" component={ReportScreen}/>

              {/* Admin Screens */}
              <Route  path="/admin/dashboard" component={DashboardScreen}/>
              <Route  path="/admin/userlist" component={ManageUsersScreen}/>
              <Route  path="/admin/user/:id/edit" component={EditUserScreen}/>
              <Route  path="/admin/user/add" component={AddUserScreen}/>
              <Route  path="/admin/customer/:id" component={CustomerDetailScreen}/>
              <Route  path="/admin/manageCatalog" component={ManageCatalogScreen}/>
              <Route  path="/admin/orderlist" component={ManageOrdersScreen}/>
              <Route  path="/admin/order/:id" component={OrderScreen}/>          
              <Route  path="/admin/reports" component={ReportScreen}/>

              {/* Extra pages */}
              <Route  path="/about" component={AboutUsScreen}/>
              <Route  path="/contact" component={ContactScreen}/>
              <Route  path="/privacy" component={PrivacyScreen}/>
              <Route  path="/tnc" component={TnCScreen}/>
          
              {/* Unauthorized access redirect screen */}
              <Route  path="/accessdenied" component={AuthorizationErrorScreen}/>
              {/* If unmatching URL is found */}
              <Route component={NoMatchPage} />

            </Switch>  
        </ScrollToTop>
        
      </main>
       {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
