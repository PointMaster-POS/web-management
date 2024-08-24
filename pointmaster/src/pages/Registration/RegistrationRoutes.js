import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register1 from './Pages/Business registration/Register1';
import Register2 from './Pages/Business registration/Register2';
import Success from './Pages/Business registration/Success';
import Ereg from './Pages/Employee/Ereg';
import Employees from './Pages/Employee/Employees';
import Landing from './Pages/Landing page/Landing';

function App() {
    return (
        <Routes>
            <Route path="/" element={<h1><Landing/></h1>} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/ereg" element={<Ereg />} />  {/* Update the route path */}
            <Route path="/register1" element={<Register1 />} />
            <Route path="/register2" element={<Register2 />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Catch-all route for unmatched paths */}
        </Routes>
    );
}

export default App;