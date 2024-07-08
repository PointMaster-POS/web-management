import ReactDOM from "react-dom";
import MainLayout from "./components/Owner's Dashboard/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";

function App() {
  //comment from Himindu
  //Commment from Pavani Karunarathna
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
