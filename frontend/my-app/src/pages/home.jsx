import { Link } from "react-router-dom";

function Homepage(){
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-2xl">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Employee Management System</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Manage departments, employees, and salaries all in one place.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/departments" className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg">
                        Departments
                    </Link>
                    <Link to="/employees" className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg">
                        Employees
                    </Link>
                    <Link to="/salaries" className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg">
                        Salaries
                    </Link>
                    <Link to="/dashboard" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg">
                        Dashboard
                    </Link>
                </div>
                {!user && (
                    <div className="mt-8 text-gray-500">
                        <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
                        <span className="mx-2">or</span>
                        <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
                        <span className="ml-1">to get started</span>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Homepage;
