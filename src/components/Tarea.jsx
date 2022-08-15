import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from '../hooks/useProyectos' //462
import useAdmin from "../hooks/useAdmin"; //479

const Tarea = ({tarea}) => { //459
  
  const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos(); //462
  
  const admin = useAdmin(); //479

  const {descripcion, nombre, prioridad, fechaEntrega,estado, _id} = tarea

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
            <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
            {estado && <p className="text-sm bg-green-600 uppercase p-1 rounded-lg text-white"
            >Completada por: {tarea.completado.nombre}</p> /* 485*/}
        </div>

        <div className="flex flex-col lg:flex-row gap-2 ">
            {admin && (
                <button
                    className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalEditarTarea(tarea)} //462
                >Editar</button>
            )}

            <button
                className={`${estado ? 'bg-sky-600' : 'bg-gray-600' } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`} //480
                onClick={()=> completarTarea(_id)} //480
            >{estado ?  'Completa' : 'Incompleta'}</button>
            

            {admin && (
                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={()=> handleModalEliminarTarea(tarea)} //466
                >Eliminar</button>
            )}
            
        </div>
    </div>
  )
}

export default Tarea
