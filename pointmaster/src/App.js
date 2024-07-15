import ReactDOM from "react-dom";
import MainLayout from "./components/Dashboard/MainLayout";
import { BrowserRouter } from "react-router-dom";
import  Customers from './pages/CustomerPages/Customers';
import CustomerInfo from './pages/CustomerPages/CustomerInfo';
import LoyalityMenu from './pages/LoyalityPrograms/LoyalityMenu'
import LoyalityIntro from './pages/LoyalityPrograms/LoyalityIntro';
import InventoryRoutes from './pages/Inventory Pages/InventoryRoutes';


function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;





