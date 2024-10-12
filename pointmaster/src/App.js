import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import MainLayout from "./components/ProtectedRoute/MainLayout";
import LogIn from "./pages/LogIn/LogIn";
import Landing from "./pages/LandingPage/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Stores from "./pages/Stores/Stores";
import Employees from "./pages/Employees/Employees";
import Profile from "./pages/Profile/Profile";
import Setting from "./pages/Settings/Settings";
import Category from "./pages/Categories/Category";
import Loyalty from "./pages/Loyalty/loyalty";
import Orders from "./pages/Orders/Orders";
import Products from "./pages/Products/Products";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext"; 
import Expires from "./pages/Expires/Expires";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MenuProvider>

          <Routes>
            
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/forgot-password" element={<LogIn forgotPassword={true} />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/category" element={<Category />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/expires" element={<Expires />} />
              <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Catch-all route */}
            </Route>
          </Routes>
        </MenuProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
