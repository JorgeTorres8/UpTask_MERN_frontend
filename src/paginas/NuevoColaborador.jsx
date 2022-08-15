import { useEffect } from "react" //469
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos" //469
import { useParams } from "react-router-dom" //469
import Alerta from "../components/Alerta" //472

const NuevoColaborador = () => { //468

  const {obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta} = useProyectos() 
  const params = useParams();

  useEffect(() => { //469
    obtenerProyecto(params.id)
  }, [])
  
  //if(cargando) return 'Cargando...' 471

  if(!proyecto?._id) return <Alerta alerta={alerta}/> //472

  return (
    <>
        <h1 className="text-4xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>

        <div className="mt-10 flex justify-center">
            <FormularioColaborador/>
        </div>

        {cargando ? <p className="font-bold text-center mt-10">cargando...</p> : colaborador?._id && (//471   
            <div className="flex justify-center mt-10">
                <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                    <h2 className="text-center mb-10 text-2xl font-bold">Resultado</h2>

                    <div className="flex justify-between items-center">
                        <p>{colaborador.nombre}</p>

                        <button
                            type="button"
                            className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                            onClick={()=> agregarColaborador({
                                email: colaborador.email
                            })}
                        >Agregar al Proyecto</button>
                    </div>

                </div>
            </div>
        )}
    </>
  )
}

export default NuevoColaborador