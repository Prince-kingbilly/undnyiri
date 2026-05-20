// import { useState } from "react";
// import { FaUsers, FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios.js";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleCreate = async (e) => {
//     e.preventDefault();

    
//     try {
//       const res = await API.post("/user/login", { email, password });

//       alert(res.data?.msg || "Login successful");
//       setErrorMessage("");

//       // // simple auth flag for UI (layout/report)
//       localStorage.setItem("authUser", JSON.stringify({ email }));

//       navigate("/report");
//     } catch (err) {
//       console.log(err);
//       setErrorMessage(err.response?.data?.msg || "Login failed");
//     }
//   };
import { useState } from "react";
import {FaUsers,FaUser,FaEnvelope,FaLock,FaUserPlus,FaSignInAlt} from "react-icons/fa"
import {useNavigate} from "react-router-dom";
import API from "../api/axios";


function Login(){
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[errorMessage,setErrorMessage]=useState('');
  const navigate=useNavigate();

  
    const handllog=async(e)=>{
      e.preventDefault()
try{
    
const res=await API.post("/user/login",{email,password});

alert(res.data?.msg || "login successfully");
setErrorMessage();
localStorage.getItem("outhUser",JSON.stringify({email}));
navigate("/report")

    }catch(err){
      console.log(err)
    }
  }






    return(
        <>
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 px-4">
       
       <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">

        <h2 className="bg-gray-700 text-white px-12 py-5">Login to EPMS <FaUsers className="" />
             </h2>
             <form onSubmit={handllog}>
                   <div className="space-y-1">
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
                <FaEnvelope className="text-gray-500 mr-2" />
  <input type="email" placeholder="Email"  className="w-full outline-none text-sm md:text-base" value={email} onChange={(e)=>setEmail(e.target.value)}/> 
 </div>
 </div><br /><br />
  <div className="space-y-1">
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
               <FaLock className="text-green-700" />
                <input type="password" className="w-full outline-none text-sm md:text-base" value={password} onChange={(e)=>setPassword(e.target.value)}/> <br /><br />

                
                </div>
 </div><br /><br /><p className="">{errorMessage}</p>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2">Login
                <FaSignInAlt className=""/>
            </button>
             </form>
       </div>
       
       </div>
        </>
    )
}

export default Login;
