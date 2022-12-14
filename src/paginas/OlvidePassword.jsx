import { useState } from "react" //420
import { Link } from "react-router-dom" //420
//import axios from "axios"; //420 coment 242
import clienteAxios from "../config/clienteAxios"; //424
import Alerta from "../components/Alerta"; //420s

const OlvidePassword = () => {

  const [email, setEmail] = useState(''); //420
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(email.length === '' || email.length < 6) {
      setAlerta({
        msg: "E-mail is required",
        error: true
      });
      return;
    }

    try {
      //const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`, {email}) coment 242
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`, {email}) //424 cliente axios
      
      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Recover your Access and do not lose your projects {' '}
      <span className="text-slate-700">Projects</span></h1>

      {msg && <Alerta alerta={alerta} />}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10 "
        onSubmit={handleSubmit}
        >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >E-mail</label>

          <input
            type="text"
            id="email"
            placeholder="Registration E-mail"
            className="mt-3 w-full bg-gray-50 border rounded-xl p-3"
            value={email} //420
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Send Instructions"
          className="bg-sky-700 mb-5 w-full text-white py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >Do you already have an account? Log in</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >You do not have an account? Sign up</Link>
      </nav>
    </>
  )
}

export default OlvidePassword
