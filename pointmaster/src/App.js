
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryDashboard from './pages/Inventory Pages/InventoryDashboard';
import Category from './pages/Inventory Pages/Category';
import Suppliers from './pages/Inventory Pages/Suppliers';
import PurchaseHistory from './pages/Inventory Pages/PurchaseHistory';
import AddProduct from './pages/Inventory Pages/AddProduct';

function App() {
  //comment from Himindu
  //Commment from Pavani Karunarathna
  return ( 
      <Router>
          <Routes>
              <Route path="/" element={<InventoryDashboard />} />
              <Route path="/category" element={<Category />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/phistory/:supplier_id" element={<PurchaseHistory />} />
              <Route path="/addproduct" element={<AddProduct />} />
          </Routes>
      </Router>

  );
}


export default App;
