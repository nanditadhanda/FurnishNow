import React from 'react';
import ReactDOM from 'react-dom';

//import Provider and store - wrapping store in provider allows store to be available in all components of the application
import { Provider } from 'react-redux'
import store from "./store"

import './css/customBootstrap.min.css';
// import './css/index.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
