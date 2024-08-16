
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Stores from "./Stores";
import Users from "./Users";
import Suppliers from "./Suppliers";
import Category from "./Category";
import Products from "./Products";
import Orders from "./Orders";
import Reports from "./Reports";
import Expired from "./Expired";
import Profile from "./Profile";

function OwnerRoutes() {
  return (
    
      <Routes>
          <Route path= "/" element={<Dashboard />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/users" element={<Users />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/expired" element={<Expired />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
  );
}


export default OwnerRoutes;
