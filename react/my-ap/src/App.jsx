import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Homepage from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Department from "./pages/crud";
import Report from "./pages/report";

import Salary from "./pages/crud1";


function App(){
  return(
    
    <>
    <Router>

<Routes>

{/* Default landing */}
<Route path="/" element={<Homepage />} />
<Route path="/homepage" element={<Homepage />} />
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route path="/department" element={<Department />} />
<Route path="/report" element={<Report />} />
<Route path="/salary" element={<Salary />} />
</Routes>

    </Router>
    </>

  )
}

export default App;