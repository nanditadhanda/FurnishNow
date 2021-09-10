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

import {Container} from 'react-bootstrap'

function App() {
  return (
    //routing to different screens based on URL path
    <Router>
      <Header />
      <main >
        <Container className="py-5">
          <Route path="/" component={HomeScreen} exact/>
          <Route path="/login" component={LoginScreen}/>
          <Route path="/register" component={RegisterScreen}/>
          <Route  path="/cart" component={CartScreen}/>
          <Route  path="/product/:category/:id" component={ProductScreen}/>
        </Container>        
      </main>
      <Footer />
    </Router>
  );
}

export default App;
