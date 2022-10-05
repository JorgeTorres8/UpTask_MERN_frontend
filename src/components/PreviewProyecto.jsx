import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"; //484

const PreviewProyecto = ({proyecto}) => { //440

  const {auth} = useAuth(); //484

  const {nombre, _id, cliente, creador} = proyecto;
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {nombre}
          <span className="text-sm text-gray-500 uppercase">{''} {cliente}</span>
        </p>

        {auth._id !== creador && (
          <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Contributor</p>
        )}

      </div>

      <Link
          to={`${_id}`}
          className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        >See Project</Link>

    </div>
  )
}

export default PreviewProyecto