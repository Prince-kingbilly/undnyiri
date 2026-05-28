import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import DepartmentPage from "./pages/departments";
import EmployeePage from "./pages/employees";
import SalaryPage from "./pages/salaries";
import Dashboard from "./pages/dashboard";

function App(){
return(
  <Router>
    <Navbar />
    <div className="md:ml-60 pt-14 md:pt-0 min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/departments" element={<DepartmentPage/>}/>
        <Route path="/employees" element={<EmployeePage/>}/>
        <Route path="/salaries" element={<SalaryPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  </Router>
)
}
export default App
