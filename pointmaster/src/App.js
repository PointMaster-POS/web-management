import ReactDOM from "react-dom";
import MainLayout from "./components/Dashboard/MainLayout";
import { BrowserRouter } from "react-router-dom";
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
