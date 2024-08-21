
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Stores from "./Stores";
import Users from "./Users";
import Reports from "./Reports";
import Expired from "./Expired";
import Profile from "./Profile";
import Category from './Category';
import Suppliers from './Suppliers';
import PurchaseHistory from './PurchaseHistory';
import AddProduct from './AddProduct';
import Orders from "./Orders";
import Product from "./Product";

function OwnerRoutes() {
  return (
    
      <Routes>
          <Route path= "/" element={<Dashboard />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/expired" element={<Expired />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category" element={<Category />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/phistory/:supplier_id" element={<PurchaseHistory />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/products" element={<Product />}/>
          <Route path="/orders" element={<Orders />} />
      </Routes>
  );
}


export default OwnerRoutes;
