import { useState } from "react" //411
import { Link } from "react-router-dom" //408
import Alerta from "../components/Alerta"; //412
//import axios from 'axios'; //414 comeentario: 424
import clienteAxios from "../config/clienteAxios"; //424

const Registrar = () => { //contenido en 408

  const [nombre, setNombre] = useState(''); //411
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => { //412
    e.preventDefault();
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'All fields are required',
        error: true
      })
      return;
    }

    if(password !== repetirPassword) { //413
      setAlerta({
        msg: "The passwords are not the same",
        error: true
      })
      return;
    }

    if(password.length < 6 ) {
      setAlerta({
        msg: "The password is very short, add a minimum of 6 characters",
        error: true
      })
      return;
    }

    setAlerta({});

    //Crear el usuario en la API 414

    try {
      //const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, {nombre, email, password}); //env 416 coment:424
      const {data} = await clienteAxios.post('/usuarios', {nombre, email, password}); //Cliente axios 424 
      setAlerta({ //415
        msg: data.msg,
        error: false
      })

      setNombre('');//416
      setEmail('');
      setPassword('');
      setRepetirPassword('');

    } catch (error) {
      setAlerta({ //415
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;

  return (
    <>
     <h1 className="text-sky-600 font-black text-6xl capitalize">Create your account and manage your{' '} 
     <span className="text-slate-700">Projects</span></h1>

     {msg && <Alerta alerta={alerta} /> /*412*/} 

     <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Name</label>
          <input
            id="nombre"
            type="text"
            placeholder="Your Name"
            className="mt-3 w-full bg-gray-50 border rounded-xl p-3"
            value={nombre} //411
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >E-mail</label>
          <input
            id="email"
            type="text"
            placeholder="Registration E-mail"
            className="mt-3 w-full bg-gray-50 border rounded-xl p-3"
            value={email} //411
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 font-bold text-xl block"
          >Password</label>
          <input
            id="password"
            type="password"
            placeholder="Registration Password"
            className="mt-3 w-full bg-gray-50 border rounded-xl p-3"
            value={password}//411
            onChange={e=> setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 font-bold text-xl block"
          >Repeat Password</label>
          <input
            id="password2"
            type="password"
            placeholder="Repeat your Password"
            className="mt-3 w-full bg-gray-50 border rounded-xl p-3"
            value={repetirPassword}//411
            onChange={e=> setRepetirPassword(e.target.value)}
          />
        </div>
        
          <input
          type="submit"
          value="Create Account"
          className="bg-sky-700 mb-5 w-full py-3 font-bold text-white uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
     </form>

     <nav className="lg:flex lg:justify-between">
      <Link
        className="block text-center my-5 text-slate-500 uppercase text-sm"
        to="/"
      >Do you already have an account? Log in</Link>

      <Link
        className="block text-center my-5 text-slate-500 uppercase text-sm"
        to="/olvide-password"
      >I forgot my password</Link>
     </nav>

    </>
  )
}

export default Registrar