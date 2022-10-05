import { useState, useEffect } from "react" //422
import { Link, useParams } from "react-router-dom" //422
//import axios  from "axios" //422 comentario 424
import clienteAxios from "../config/clienteAxios" //424
import Alerta from "../components/Alerta" //422

const NuevoPassword = () => { //contenido 410(return)

  const [password, setPassword] = useState(''); //423
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);//423
  
  const params = useParams();
  const {token} = params

  useEffect(() => { //422
    const comprobarToken = async () => {
      
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`); //242 cliente Axios
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken();
  }, [])
  
  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6 ) {
      setAlerta({
        msg: 'The password must be at least 6 characters',
        error: true
      })
      return;
    }

    try {
      //const url = `http://localhost:4000/api/usuarios/olvide-password/${token}`//424 comentario
      const url = `/usuarios/olvide-password/${token}` //424
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true); //243
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reset your password and do not lose access to your {' '}
      <span className="text-slate-700">Projects</span></h1>

      {msg && <Alerta alerta={alerta}/> }

      {tokenValido && (
        <form 
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}>
          
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 font-bold text-xl block"
            >New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu Nuevo Password"
              className="mt-3 w-full bg-gray-50 border rounded-xl p-3"
              value={password} //423
              onChange={ e => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Save New Password"
            className="bg-sky-700 mb-5 w-full text-white py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
      </form> 
      )}

      {passwordModificado && (
        <Link
        className="block text-center my-5 text-slate-500 uppercase text-sm"
        to="/"
        >Log in</Link>
      )}
      
  </>
  )
}

export default NuevoPassword