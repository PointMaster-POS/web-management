import React from "react";
import RegisterNewBusiness from "./pages/RegisterNewBusiness/RegisterNewBusiness";
import RegisterOwner from "./pages/RegisterOwner/RegisterOwner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/ProtectedRoute/MainLayout";
import LogIn from "./pages/LogIn/LogIn";
import Landing from "./pages/LandingPage/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Stores from "./pages/Stores/Stores";
import Employees from "./pages/Employees/Employees";
import Expired from "./pages/Expired/Expired";
import Profile from "./pages/Profile/Profile";
import Category from "./pages/Categories/Category";
import Suppliers from "./pages/Suppliers/Suppliers";
import PurchaseHistory from "./pages/Suppliers/PurchaseHistory";
import Orders from "./pages/Orders/Orders";
import Products from "./pages/Products/Products";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    // <RegisterNewBusiness />
    // <RegisterOwner/>

        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/forgot-password" element={<LogIn forgotPassword={true} />} />

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
                <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Catch-all route for unmatched paths */}
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
  );
};

export default App;
