import {Link} from "react-router-dom";
import {FaUsers,FaSignInAlt,FaPlus} from "react-icons/fa"

function Homepage(){
    return( 
        
        <>

        <div className="h-screen flex flex-col justify-center items-center bg-blue-900/80">
        <h2 className="font-bold text-2xl text-white">Employee payroll Management System   
            <FaUsers className="inline text-yellow-400 ml-2" />
        </h2>

        <Link to={"/login"} className="mt-4 h-8 bg-black text-white rounded px-8 py-1 group hover:scal-105 transition-all">
        Login
        <FaSignInAlt className="inline text-yellow-400 ml-green " />
        </Link>

        <Link to={"/register"} className="mt-4 h-8 bg-black text-white rounded px-8 py-1 group hover:scal-105 transition-all">
        register
        <FaPlus className="inline text-yellow-400 ml-green " />
        </Link>
       
        </div>
        </>
    )
}

export default Homepage;