import ReactDOM from "react-dom";
import MainLayout from "./components/Owner's Dashboard/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import  Customers from './pages/CustomerPages/Customers';
import CustomerInfo from './pages/CustomerPages/CustomerInfo';
import LoyalityMenu from './pages/LoyalityPrograms/LoyalityMenu'
import LoyalityIntro from './pages/LoyalityPrograms/LoyalityIntro';
import InventoryRoutes from './pages/Inventory Pages/InventoryRoutes';

function App() {
  //comment from Himindu
  //Commment from Pavani Karunarathna
  return (
    <div className="App">

      <BrowserRouter>
        <MainLayout />
        <InventoryRoutes />
      </BrowserRouter>

      <LoyalityMenu />

    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;





