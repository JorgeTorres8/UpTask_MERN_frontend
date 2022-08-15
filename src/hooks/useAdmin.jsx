import useProyectos from'./useProyectos';
import useAuth from './useAuth';

const useAdmin = () => { //479
    const {proyecto} = useProyectos();
    const {auth} = useAuth();

    return proyecto.creador === auth._id;
}

export default useAdmin;

