// InventoryDashboard.jsx
import React from 'react';
import NavigationBar from '../../components/Inventory Components/NavigationBar';
import Sidebar from '../../components/Inventory Components/SideBar';
import './inventorydashboard.css';

function InventoryDashboard() {
  return (
    <div className="inventory-dashboard">
      <Sidebar />
      <div className="main-content">
        <NavigationBar />
        <div className="content">
          {/* Your main content goes here */}
          
        </div>
      </div>
    </div>
  );
}

export default InventoryDashboard;
