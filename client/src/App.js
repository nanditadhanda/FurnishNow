import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

import {Container} from 'react-bootstrap'

function App() {
  return (
    <Router>
      <Header />
      <main >
        <Container className="py-5">
          <Route path="/" component={HomeScreen} exact/>
          <Route  path="/cart/:id?" component={CartScreen}/>
           <Route  path="/product/:category/:id" component={ProductScreen}/>
        </Container>
        
         
        
               
      </main>
      <Footer />
    </Router>
  );
}

export default App;
