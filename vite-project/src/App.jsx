import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Register from "./pages/register";
import Homepage from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Suppliers from "./pages/suppliers";
import Shipments from "./pages/shipments";
import Deliveries from "./pages/deliveries";
import Report from "./pages/report";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="dashboard/suppliers" element={<Suppliers/>}/>
        <Route path="dashboard/shipments" element={<Shipments/>}/>
        <Route path="dashboard/deliveries" element={<Deliveries/>}/>
        <Route path="dashboard/report" element={<Report/>}/>
      </Routes>
    </Router>
  )
}
export default App
