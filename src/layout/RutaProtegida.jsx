import { Outlet, Navigate } from "react-router-dom" //431
import Header from "../components/Header"; //433
import Sidebar from "../components/Sidebar"; //433
import useAuth from "../hooks/useAuth" //431
import Spinner from "../components/Spinner";
const RutaProtegida = () => { //431

    const {auth, cargando} = useAuth();
    
  return (
    <>
        {cargando ? <Spinner/> : 
        auth._id ? 
            (
                <div className="bg-gray-100">
                    <Header/>

                    <div className="md:flex md:min-h-screen">
                        <Sidebar/>

                        <main className=" p-10 flex-1">
                            <Outlet/>
                        </main>
                    </div>
                </div>
            ) : <Navigate to="/" />
        }
        
    </>
  )
}

export default RutaProtegida