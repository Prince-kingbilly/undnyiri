import { useState } from "react";
import {FaUsers,FaUser,FaEnvelope,FaLock,FaUserPlus} from "react-icons/fa"
import { Link,useNavigate } from "react-router-dom";
import API from "../api/axios.js";
function Register(){
const [username,setUsername]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [errorMessage,setErrorMessage]=useState('')
const navigate=useNavigate()
//e prvede dataolls where action happen like click,elememt ,time happen
const handleCreate=async(e)=>{
    e.preventDefault()

    try{
        const res=API.post("/user/register",{username,email,password});
       if(res){
         alert((await res).data.msg);//wait message from backend
        setErrorMessage('');
        navigate("/login")
       }
       else{
        alert("user failed to be inserted")
       }
    }
    catch(err){
console.log(err)
setErrorMessage(err.response?.data?.msg);

    }
}

    return(
<>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 px-4">

    <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 ">

      {/* Header */}
      <h2 className="text-center text-lg md:text-xl font-bold text-white bg-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 py-10">
        Create free account on EPMS
        <FaUsers />
      </h2>

      <form onSubmit={handleCreate} className="space-y-5">

        {/* Username */}
        <div className="space-y-1">
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <FaUser className="text-gray-500 mr-2" />
            <input type="text" placeholder="Username" className="w-full outline-none text-sm md:text-base" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input type="email" placeholder="Email" className="w-full outline-none text-sm md:text-base" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <FaLock className="text-gray-500 mr-2" />
            <input type="password" placeholder="Password" className="w-full outline-none text-sm md:text-base" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        {/* Button */}
        <button type="submit" className="w-full bg-orange-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2">Register<FaUserPlus /></button>

        {/* Login Link */}
        <p className="text-center text-sm">Already have an account?{" "} <Link to="/login" className="text-red-600 font-medium hover:underline">Login</Link></p>

      </form>
    </div>

  </div>
</>
    )
}

export default Register;