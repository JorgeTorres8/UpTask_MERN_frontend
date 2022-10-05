import { useEffect, useState } from "react" //419
import {useParams, Link} from "react-router-dom"//419
//import axios from 'axios'//419 comentario 424
import clienteAxios from "../config/clienteAxios" //424
import Alerta from "../components/Alerta" //419

const ConfirmarCuenta = () => { //contenido 410 (return)
  
  const [alerta, setAlerta] = useState({}); //419
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false) //419

  const params = useParams();
  const {id} = params;
  
  useEffect(() => { //419
    const confirmarCuenta = async () => {
      try {
        //const url = `http://localhost:4000/api/usuarios/confirmar/${id}` comentario 424
        const url = `/usuarios/confirmar/${id}` //424 cliente axios 
        const {data} = await clienteAxios(url); //424 cliente axios 

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true);

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta();
  }, [])
  
  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Confirm your account and start creating your {' '}
      <span className="text-slate-700">Projects</span></h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 bg-white rounded-xl">
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
          >Log in</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta
