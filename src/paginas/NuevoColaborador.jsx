import { useEffect } from "react" //469
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos" //469
import { useParams } from "react-router-dom" //469
import Alerta from "../components/Alerta" //472
import Spinner2 from "../components/Spinner2"
const NuevoColaborador = () => { //468

  const {obtenerProyecto, proyecto, loading, colaborador, agregarColaborador, alerta} = useProyectos() 
  const params = useParams();

  useEffect(() => { //469
    obtenerProyecto(params.id)
  }, [])
  
  //if(cargando) return 'Cargando...' 471

  if(!proyecto?._id) return <Alerta alerta={alerta}/> //472

  return (
    <>
        <h1 className="text-4xl font-black">Add Contributor to the Project: {proyecto.nombre}</h1>

        <div className="mt-10 flex justify-center">
            <FormularioColaborador/>
        </div>

        {loading ? <Spinner2/> : colaborador?._id && (//471   
            <div className="flex justify-center mt-10">
                <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                    <h2 className="text-center mb-10 text-2xl font-bold">Result</h2>

                    <div className="flex justify-between items-center">
                        <p>{colaborador.nombre}</p>

                        <button
                            type="button"
                            className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                            onClick={()=> agregarColaborador({
                                email: colaborador.email
                            })}
                        >Add to Project</button>
                    </div>

                </div>
            </div>
        )}
    </>
  )
}

export default NuevoColaborador