import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom"; //432
import clienteAxios from "../config/clienteAxios"; //430

const AuthContext = createContext(); //427

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({}); //429
    const [cargando, setCargando] = useState(true); //432

    const navigate = useNavigate(); //432

    useEffect(() => { //430
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false); //432
                return 
            }

            const config = { //430
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try { //430
                const {data} = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                //navigate('/proyectos') //442
                /*if(data._id && location.pathname === '/') {
                    navigate('/proyectos')
                 }*/
            } catch (error) {
                setAuth({}); //432
            } finally {
                setCargando(false); //432
            }
        }
        autenticarUsuario()
    }, [])

    const cerrarSesionAuth = () => { //498
        setAuth({});
    }
    

    return(
        <AuthContext.Provider
            value={{ 
                setAuth, //429
                auth, //431
                cargando, //432
                cerrarSesionAuth //498
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext