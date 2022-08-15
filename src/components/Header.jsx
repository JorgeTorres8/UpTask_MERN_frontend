import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos" //487
import useAuth from "../hooks/useAuth" //498
import Busqueda from "../components/Busqueda" //487

const Header = () => { //433

  const {handleBuscador, cerrarSesionProyectos} = useProyectos(); //487
  const {cerrarSesionAuth} = useAuth(); //498

  const handleCerrarSesion = () => { //498
    cerrarSesionAuth();
    cerrarSesionProyectos();
    localStorage.removeItem('token');
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</h2>

            <div className="flex flex-col md:flex-row items-center gap-4">

                <button
                    type="button"
                    className="font-bold uppercase"
                    onClick={() => handleBuscador()}
                >Buscar Proyecto</button>

                <Link
                    to="/proyectos"
                    className="font-bold uppercase"
                >Proyectos</Link>

                <button
                    type="button"
                    className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                    onClick={handleCerrarSesion} //498
                >Cerrar Sesión</button>

                <Busqueda  /*487*/ />
            </div>
        </div>
    </header>
  )
}

export default Header