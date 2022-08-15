import { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider";

const useProyectos = () => { //435
    return useContext(ProyectosContext);
}

export default useProyectos;