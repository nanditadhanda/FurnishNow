import React from 'react'
//routing and redirecting
import { BrowserRouter as Router, Route } from 'react-router-dom'

//import header-footer components
import Header from './components/Header'
import Footer from './components/Footer'

//import app screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import MyOrderListScreen from './screens/myOrderListScreen'

import {Container} from 'react-bootstrap'

function App() {
  return (
    
    <Router>
      {/* Header component*/}
      <Header />
      {/* app body screens*/}
      <main >
        {/* register routing to different screens based on URL path */}
        <Container className="py-5">
          <Route path="/" component={HomeScreen} exact/>
          <Route path="/login" component={LoginScreen}/>
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen}/>
          <Route  path="/cart" component={CartScreen}/>
          <Route  path="/shipping" component={ShippingScreen}/>
          <Route  path="/payment" component={PaymentScreen}/>
          <Route  path="/placeorder" component={PlaceOrderScreen}/>
          <Route  path="/my-orders" component={MyOrderListScreen}/>
          <Route  path="/order/:id" component={OrderScreen}/>
          <Route  path="/product/:category/:id" component={ProductScreen}/>
        </Container>        
      </main>
       {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
