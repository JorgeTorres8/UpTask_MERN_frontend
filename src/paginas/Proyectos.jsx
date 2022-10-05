import { useEffect } from "react"; 
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"; //440
import Alerta from "../components/Alerta"; //483
/*import io from 'socket.io-client' //490 

let socket; //490  COMENTADO 492 TUTORIAL*/

const Proyectos = () => {
  const {proyectos, alerta} = useProyectos(); //439

  /*useEffect(() => { // 490 apenas cargue la pagina se conecte a socket.io  (pasar del frontend hacia el bakend)
    socket = io(import.meta.env.VITE_BACKEND_URL); //abrir una conexion hacia socket.io
    socket.emit('prueba', proyectos) // 491 enviara el evento de prueba al servidor (emit: crear o emitir ese evento)

    socket.on('respuesta', (persona) => {
        console.log("Desde el Frontend", persona);
    }) 
  })TUTORUIAL, COMENTADO EN 492*/
  

  const {msg} = alerta; //483 
  return (
    <>
      <h1 className="text-4xl font-black">Projects</h1>

      {msg && <Alerta alerta={alerta}/>}

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ?
        
        proyectos.map(proyecto => ( //440
          <PreviewProyecto
            key={proyecto._id}
            proyecto={proyecto}
          />
        ))
        
        : <p className="text-center text-gray-600 uppercase p-5">No Projects</p>}
      </div>
    </>
  )
}

export default Proyectos