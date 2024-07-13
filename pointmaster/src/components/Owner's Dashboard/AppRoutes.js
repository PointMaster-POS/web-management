
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Stores from "./Pages/Stores";
import Users from "./Pages/Users";
import Suppliers from "./Pages/Suppliers";
import Category from "./Pages/Category";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Reports from "./Pages/Reports";
import Expired from "./Pages/Expired";
import Profile from "./Pages/Profile";

function AppRoutes() {
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
          <Route path="logout" element={<div>Logout Page</div>} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
  );
}


export default AppRoutes;
