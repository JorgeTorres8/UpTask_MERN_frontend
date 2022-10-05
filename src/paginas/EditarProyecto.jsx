import { useEffect } from "react"; //444
import { useParams, useNavigate } from "react-router-dom";//444
import useProyectos from "../hooks/useProyectos" //444
import FormularioProyecto from "../components/FormularioProyecto";
import Spinner from "../components/Spinner";

const EditarProyecto = () => { //444

  const params = useParams();
  const navigate = useNavigate();
  const {obtenerProyecto, proyecto, cargando, eliminarProyecto} = useProyectos();



  useEffect(() => {
      obtenerProyecto(params.id)
  }, [])
  
  const handleClick = () => {  //448
    Swal.fire({
      title: 'Are you sure you want to delete this project?',
      text: "You will not be able to reverse this action",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProyecto(params.id)
        Swal.fire(
          'Deleted',
          'This project has been deleted!',
          'success'
        )
        navigate('/proyectos');
      }
    })
  }

  const {nombre} = proyecto
  
   
  return (
    
    <>
      {cargando ? <Spinner/> :
      <>
        <div className="flex justify-between">
          <h1 className="font-black text-4xl">Edit Project: {nombre}</h1>

          <div className="flex items-center gap-2 text-gray-400 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
              <button
                className="uppercase font-bold"
                onClick={handleClick}
              >Delete</button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <FormularioProyecto/>
        </div>
      </>}
        
    </>
    
  )
}

export default EditarProyecto