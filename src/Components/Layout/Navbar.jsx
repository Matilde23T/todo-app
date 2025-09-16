import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContex";


export default function Navbar(){

    const {isAuthenticated, logout} = useAuth();

    return(
        <nav className="bg-navbar text-white shadow-md w-full">
            
            <div className="w-full px-4">
                <div className="flex justify-between items-center h-16  ">

<div className="flex shrink-0 ">
    <Link to='/' className='text-2xl font-bold hover:text-gray-200 md:text-3xl'>
    TodoApp
    </Link>
</div>



<div className="flex items-center space-x-4 ">
{isAuthenticated ?(
    <>
    <Link to='/dashboard' className="bg-white text-blue-500 px-3 py-1 rounded-lg text-base hover:bg-gray-100">
    Dashboard
    </Link>
    <button onClick={logout}
    className="bg-red-500 rounded-lg py-1 px-3 text-base hover:bg-red-600">
        Logout
    </button>
    </>
):
(
    <Link to='/login' className="bg-white text-blue-500 px-3 py-1 rounded-lg hover:bg-gray-100 ">
    Accedi
    </Link>
)}
</div>
                </div>

            </div>
        </nav>
    )
}