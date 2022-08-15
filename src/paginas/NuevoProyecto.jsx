import FormularioProyecto from "../components/FormularioProyecto" //436
const NuevoProyecto = () => { //433
    return (
      <>
        <h1 className="text-4xl font-black">Crear Proyecto</h1>
  
        <div className="mt-10 flex justify-center">
          <FormularioProyecto/>
        </div>
      </>
    )
  }
  
  export default NuevoProyecto