import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom'; //438
import useAuth from "../hooks/useAuth"; //499
import io from 'socket.io-client'; //494

let socket; //494

const ProyectosContext = createContext(); //434

const ProyectosProvider = ({children}) => {
    
    const [proyectos, setProyectos] = useState([]); //439
    const [alerta, setAlerta] = useState({}); //437
    const [proyecto, setProyecto] = useState({}); //443
    const [cargando, setCargando] = useState(false); //443
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false); // 453
    const [tarea, setTarea] = useState({}); //462
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false); //466
    const [colaborador, setColaborador] = useState({}); //470
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false); //475
    const [buscador, setBuscador] = useState(false); //487

    const navigate = useNavigate(); //438
    const {auth} = useAuth(); //499 

    useEffect(() => { //439
        const obtenerProyectos =  async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
    
                const config = {
                    headers: {
                        "Current-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/proyectos', config)
                setProyectos(data);

            } catch (error) {
                console.log(error);
            }
        }

        obtenerProyectos();
    }, [auth]) //auth 499
    
    useEffect(() => { //494
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, [])
    

    const mostrarAlerta = alerta => { //437
        setAlerta(alerta);

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const submitProyecto = async proyecto => { //438

        if(proyecto.id) { //446
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
        //movimos el try catch a nuevoProyecto()
    }
    
    const nuevoProyecto = async proyecto => { //446
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/proyectos', proyecto, config)
            console.log(data);

            setProyectos([...proyectos, data]) //441 para que cuando introduzca un nuevo proyecto aparezca de una en /proyectos
        
            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    const editarProyecto = async proyecto => { //446
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config )

            //Sincronizar el State 447
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: 'Proyecto Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 3000);

        } catch (error) {
            console.log(error);
        }

    }


    const obtenerProyecto = async id => { //443
        setCargando(true); //443
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios(`/proyectos/${id}`, config);
            setProyecto(data); //443
            setAlerta({}) //478 
        } catch (error) {
            navigate('/proyectos') //483
            setAlerta({ //472
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => { //483
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false); //443
        }
        
        
        
    }

    const eliminarProyecto = async id => {//448 contenido en 449
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config);
            
            //sincronizar el State
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados);
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalTarea = () => { //453
        setModalFormularioTarea(!modalFormularioTarea);
        setTarea({}); //463
    }

    const submitTarea = async tarea => { //455
        
        if(tarea?.id) { //464
            await editarTarea(tarea);
        } else {
            await crearTarea(tarea);
        }
    }

    const crearTarea = async tarea => { //464 contenido anteriormente en submitTarea
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const {data} = await clienteAxios.post('/tareas', tarea, config)

            //Agrega la Tarea al state 461 OJO PASAMOS ESTE CODIGO A SubmitTareasProyecto socketIO 494 
            /*const proyectoActualizado =  {...proyecto} 
            proyectoActualizado.tareas = [...proyecto.tareas, data]
            setProyecto(proyectoActualizado);*/
            setAlerta({})
            setModalFormularioTarea(false);

            //SOCKET IO 494
            socket.emit('nueva tarea', data)
        } catch (error) {
            console.log(error);
        }
    }

    const editarTarea = async tarea => { //464
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);

           /* //Actualizar el DOM 465 pasamos el codigo
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === data._id ? data : tareaState) 
            setProyecto(proyectoActualizado);*/
            
            setAlerta({});
            setModalFormularioTarea(false);

            //SOCKET 496
            socket.emit('actualizar tarea', data)

        } catch (error) {
            console.log(error);
        }
    }

    const handleModalEditarTarea = tarea => { //462
        setTarea(tarea);
        setModalFormularioTarea(true);
    }

    const handleModalEliminarTarea = tarea => { //466
        setTarea(tarea);
        setModalEliminarTarea(!modalEliminarTarea);
    }

    const eliminarTarea = async () => { //467
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })

            /*const proyectoActualizado = {...proyecto}; //495 cortamos y pasamos a la funcion eliminarTareaProyecto
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState => tareaState._id !== tarea._id)
            setProyecto(proyectoActualizado);*/
            setModalEliminarTarea(false);

            // Socket io 495
            socket.emit("eliminar tarea", tarea)

            setTarea({})
            setTimeout(() => {
                setAlerta({});
            }, 3000);

        } catch (error) {
            console.log(error);
        }

    }

    const submitColaborador = async email => {//469
        setCargando(true);
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/proyectos/colaboradores', {email}, config)
            setColaborador(data);
            setAlerta({});

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false);
        }
    }

    const agregarColaborador = async email => { //471 contenido en 472
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({});

            setTimeout(() => { //478
                setAlerta({})
            }, 3000);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleModalEliminarColaborador = (colaborador) => { //475
        setModalEliminarColaborador(!modalEliminarColaborador);
        setColaborador(colaborador);
    }

    const eliminarColaborador = async () => { //476
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)
            
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            
            setProyecto(proyectoActualizado)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setColaborador({});
            setModalEliminarColaborador(false);

            setTimeout(() => { //478
                setAlerta({})
            }, 3000);

        } catch (error) {
            console.log(error.response);
        }
    }

    const completarTarea = async id => { //480
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Current-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            
            /*const proyectoActualizado = {...proyecto} cortamos y pegamos en la funcion: 
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState) //481 
            setProyecto(proyectoActualizado);*/
            setTarea({});
            setAlerta({});

            //socket 497
            socket.emit('cambiar estado', data)

        } catch (error) {
            console.log(error);
        }
    }

    const handleBuscador = () => { //487
        setBuscador(!buscador)
    }

    //Socket IO 494
    const submitTareasProyecto = (tarea) => { //para agregar tareas (crearTarea) 
        
        const proyectoActualizado =  {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado);
    }

    const eliminarTareaProyecto = (tarea) => { //495
        const proyectoActualizado = {...proyecto}; //495 cortamos de eliminarTarea
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState => tareaState._id !== tarea._id)
        setProyecto(proyectoActualizado)
    }

    const actualizarTareaProyecto = (tarea) => { //496
        //Actualizar el DOM 465 cortamos de Editar Tarea
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === tarea._id ? tarea : tareaState) 
        setProyecto(proyectoActualizado);
    }

    const cambiarEstadoTarea = (tarea) => { //497
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState) //481 
        setProyecto(proyectoActualizado);
    }

    const cerrarSesionProyectos = () => { //498
        setProyectos([]);
        setProyecto({});
        setAlerta({});
    }

    return (
        <ProyectosContext.Provider
            value={{
                mostrarAlerta, //437
                alerta,
                submitProyecto,
                proyectos, //439
                obtenerProyecto, //442
                proyecto, //443
                cargando,
                eliminarProyecto, //448
                modalFormularioTarea, //453
                handleModalTarea,
                submitTarea, //455
                handleModalEditarTarea, //462
                tarea,
                handleModalEliminarTarea, //466
                modalEliminarTarea,
                eliminarTarea, //467
                submitColaborador, //469
                colaborador, //471
                agregarColaborador,
                handleModalEliminarColaborador, //475
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea, //480
                handleBuscador, //487
                buscador,
                submitTareasProyecto, //494
                eliminarTareaProyecto, //495
                actualizarTareaProyecto, //496
                cambiarEstadoTarea, //497
                cerrarSesionProyectos //498
            }}
        > {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext;