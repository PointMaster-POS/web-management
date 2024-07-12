import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryDashboard from './InventoryDashboard';
import Category from './Category';
import Suppliers from './Suppliers';
import PurchaseHistory from './PurchaseHistory';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import MainLayout from '../../components/Inventory Components/MainLayout';

function InventoryRoutes() {
  return ( 
    <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<InventoryDashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/phistory/:supplier_id" element={<PurchaseHistory />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productlist" element={<ProductList />}/>
        </Route>  
    </Routes>
  );
}


export default InventoryRoutes;