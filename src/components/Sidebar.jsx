import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth" //433

const Sidebar = () => { //433

  const {auth} = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
        <p className="text-xl font-bold">Hello: {auth.nombre}</p>

        <Link
            to="crear-proyecto"
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >New Proyect</Link>

    </aside>
  )
}

export default Sidebar