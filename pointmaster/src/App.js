import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import InventoryRoutes from './pages/Inventory Pages/InventoryRoutes';

function App() {
    return (
        <Router>
          <InventoryRoutes />
        </Router>
    );
};

export default App;
