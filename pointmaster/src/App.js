import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage/Landing";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
// import LogIn from "./pages/LogIn/LogIn";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Stores from "./pages/Stores/Stores";
// import Employees from "./pages/Employees/Employees";
// import Profile from "./pages/Profile/Profile";
// import Category from "./pages/Categories/Category";
// import Loyalty from "./pages/Loyalty/loyalty";
// import Products from "./pages/Products/Products";
// import Expires from "./pages/Expires/Expires";

const LogIn = lazy(() => import("./pages/LogIn/LogIn"));
const MainLayout = lazy(() => import("./components/ProtectedRoute/MainLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Stores = lazy(() => import("./pages/Stores/Stores"));
const Employees = lazy(() => import("./pages/Employees/Employees"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Category = lazy(() => import("./pages/Categories/Category"));
const Loyalty = lazy(() => import("./pages/Loyalty/loyalty"));
const Products = lazy(() => import("./pages/Products/Products"));
const Expires = lazy(() => import("./pages/Expires/Expires"));

const LoadingFallback = () => (
  <div>
    Loading...
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MenuProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <LogIn />
                </Suspense>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <LogIn forgotPassword={true} />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <MainLayout />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/category" element={<Category />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="/products" element={<Products />} />
              <Route path="/expires" element={<Expires />} />
            </Route>
              <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </MenuProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
