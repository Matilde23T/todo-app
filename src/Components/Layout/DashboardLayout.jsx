import { Outlet } from "react-router-dom";
import { useAuth} from '../../Context/AuthContex'
import { Link } from "react-router-dom";
import { House } from "lucide-react";

export default function DashboardLayout(){

    const {user, logout} = useAuth();

    return(
        <div>
            <div className="flex justify-between items-center px-4 md:px-9 bg-navbar"> 
            
            <h1 className="text-2xl text-white my-5 font-bold md:text-4xl ">Dashboard Todos</h1>
                   <div>
                     <Link to='/' >
                        <House size={30} className="text-white" />
                      </Link>
                      
                </div>
            </div>
            
            <nav className="flex justify-between items-center px-4 py-9 my-8 md:px-10 ">
                <div>
                   <h3 className="font-normal text-xl 
                   md:text-2xl"> Benvenuto 
                     <span className="font-bold ml-2">{user?.username}</span>
                     !</h3>
                </div>
                <div>
                    <button onClick={logout}
                    className=" py-2 px-3 rounded-xl text-base text-red-800 bg-red-100 md:text-xl">
                        Logout
                    </button>

                </div>
                
            </nav>
       
        <main>
<Outlet/>
        </main>
         </div>

    )
}