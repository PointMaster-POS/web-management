import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Customers from './pages/CustomerPages/Customers';
import CustomerInfo from './pages/CustomerPages/CustomerInfo';
import Employees from './pages/Employee/Employees';
import Ereg from './pages/Employee/Ereg';
import EdetailsEdit from './pages/Employee/EdetailsEdit';


function App() {
  return (
    <div className="App">
      <Customers/>
    </div>
  );
}


export default App;

