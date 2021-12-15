import React from 'react'

//routing and redirecting
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

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
import UserListScreen from './screens/UserListScreen'
import EditUserScreen from './screens/EditUserScreen'
import AuthorizationErrorScreen from './screens/AuthorizationErrorScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import CatalogScreen from './screens/CatalogScreen'
import StoreManagerDashboard from './screens/StoreManagerDashboard'
import AdminDashboard from './screens/AdminDashboard'


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

        <Switch>
          <Route  path="/products/:category" component={CatalogScreen}/>         

          <Route path="/" component={HomeScreen} exact/>
          
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
          <Route  path="/store-manager/dashboard" component={StoreManagerDashboard}/>
          <Route  path="/store-manager/productlist" component={ProductListScreen}/>
          <Route  path="/store-manager/product/:id/edit" component={ProductEditScreen}/>
          <Route  path="/store-manager/orderlist" component={OrderListScreen}/>

          {/* Admin Screens */}
          <Route  path="/admin/dashboard" component={AdminDashboard}/>
          <Route  path="/admin/userlist" component={UserListScreen}/>
          <Route  path="/admin/user/:id/edit" component={EditUserScreen}/>
          <Route  path="/admin/productlist" component={ProductListScreen}/>
          <Route  path="/admin/orderlist" component={OrderListScreen}/>
          <Route  path="/admin/order/:id" component={OrderScreen}/>
      
          {/* Unauthorized access redirect screen */}
          <Route  path="/accessdenied" component={AuthorizationErrorScreen}/>
          {/* If unmatching URL is found */}
          <Route component={NoMatchPage} />

        </Switch>
          
        

               
      </main>
       {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
