// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import LogIn from "./components/LogIn/LogIn";
// import { useState } from "react";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return isAuthenticated ? (
//     <BrowserRouter>
//       <MainLayout setIsAuthenticated={setIsAuthenticated} />
//     </BrowserRouter>
//   ) : (
//     <LogIn
//       isAuthenticated={isAuthenticated}
//       setIsAuthenticated={setIsAuthenticated}
//     />
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Dashboard/MainLayout";
import LogIn from "./components/LogIn/LogIn";
import Landing from "./pages/Registration/LandingPage/Landing";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Owner Dashboard/Dashboard/Dashboard";
import Stores from "./pages/Owner Dashboard/Stores";
import Employees from "./pages/Owner Dashboard/Employees";
import Expired from "./pages/Owner Dashboard/Expired";
import Profile from "./pages/Owner Dashboard/Profile";
import Category from "./pages/Owner Dashboard/Category";
import Suppliers from "./pages/Owner Dashboard/Suppliers";
import PurchaseHistory from "./pages/Owner Dashboard/PurchaseHistory";
import Orders from "./pages/Owner Dashboard/Orders";
import Products from "./pages/Owner Dashboard/Products";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes for internal pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/expired" element={<Expired />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category" element={<Category />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route
              path="/phistory/:supplier_id"
              element={<PurchaseHistory />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
