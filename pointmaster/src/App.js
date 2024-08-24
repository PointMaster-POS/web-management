import ReactDOM from "react-dom";
import MainLayout from "./components/Dashboard/MainLayout";
import { BrowserRouter } from "react-router-dom";
import Customers from "./pages/CustomerPages/Customers";
import CustomerInfo from "./pages/CustomerPages/CustomerInfo";
import LoyalityMenu from "./pages/LoyalityPrograms/LoyalityMenu";
import LoyalityIntro from "./pages/LoyalityPrograms/LoyalityIntro";
import LogIn from "./components/LogIn/LogIn";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <BrowserRouter>
      <MainLayout setIsAuthenticated={setIsAuthenticated} />
    </BrowserRouter>
  ) : (
    <LogIn
      isAuthenticated={isAuthenticated}
      setIsAuthenticated={setIsAuthenticated}
    />
  );
}

export default App;
