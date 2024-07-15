import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryDashboard from './InventoryDashboard';
import Category from './Category';
import Suppliers from './Suppliers';
import PurchaseHistory from './PurchaseHistory';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import Profile from './Profile';
import Settings from './Settings';

function InventoryRoutes() {
  return ( 
    <Routes>
        <Route path="/" element={<InventoryDashboard />}>
        <Route path="/adminDashboard" element={<ProductList /> } />
        <Route path="/managerDashboard" element={<Suppliers /> } />
        <Route path="/category" element={<Category />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/phistory/:supplier_id" element={<PurchaseHistory />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/productlist" element={<ProductList />}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/settings" element={<Settings/>} />
      </Route>  
    </Routes>
  );
}


export default InventoryRoutes;