import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Component/Owner's Dashboard/MainLayout";
import Dashboard from "./Component/Owner's Dashboard/Dashboard";
import Stores from "./Component/Owner's Dashboard/Stores";
import Users from "./Component/Owner's Dashboard/Users";
import Suppliers from "./Component/Owner's Dashboard/Suppliers";
import Category from "./Component/Owner's Dashboard/Category";
import Products from "./Component/Owner's Dashboard/Products";
import Orders from "./Component/Owner's Dashboard/Orders";
import Reports from "./Component/Owner's Dashboard/Reports";
import Expired from "./Component/Owner's Dashboard/Expired";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="stores" element={<Stores />} />
          <Route path="users" element={<Users />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="category" element={<Category />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reports" element={<Reports />} />
          <Route path="expired" element={<Expired />} />
          <Route path="logout" element={<div>Logout Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
