
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Stores from "./Stores";
import Employees from "./Employees";
import Expired from "./Expired";
import Profile from "./Profile";
import Category from './Category';
import Suppliers from './Suppliers';
import PurchaseHistory from './PurchaseHistory';
import Orders from "./Orders";
import Products from "./Products";

function OwnerRoutes() {
  return (
    
      <Routes>
          <Route path= "/" element={<Dashboard />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/expired" element={<Expired />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category" element={<Category />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/phistory/:supplier_id" element={<PurchaseHistory />} />
          <Route path="/products" element={<Products />}/>
          <Route path="/orders" element={<Orders />} />
      </Routes>
  );
}


export default OwnerRoutes;
