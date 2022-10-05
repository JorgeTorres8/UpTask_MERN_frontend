import { useState } from 'react' //425
import {Link, useNavigate} from 'react-router-dom' //407
import Alerta from '../components/Alerta' //425
import clienteAxios from '../config/clienteAxios' //425
import useAuth from '../hooks/useAuth' //429

const Login = () => {

  const [email, setEmail] = useState('') //425
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth(); //429

  const navigate = useNavigate(); //450

  const handleSubmit = async e => { //425
    e.preventDefault();

    if([email, password].includes('')) {
      setAlerta({
        msg: 'All fields are required',
        error: true
      });
      return;
    }

    try { //426
      const {data} = await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({});
      localStorage.setItem('token', data.token);
      setAuth(data); //429
      navigate('/proyectos'); //450 OJO
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
      <h1 className="text-sky-600 font-black text-6xl capitalize">Login and manage your {''}
        <span className="text-slate-700">projects</span></h1>
      
      {msg && <Alerta alerta={alerta}/> /*425*/}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}>

        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
            >E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Registration E-mail"
            className="mt-3 bg-gray-50 w-full border rounded-xl p-3"
            value={email} //425
            onChange={e => setEmail(e.target.value)} //425
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
            >Password</label>
          <input
            id="password"
            type="password"
            placeholder="Registration Password"
            className="mt-3 bg-gray-50 w-full border rounded-xl p-3"
            value={password} //425
            onChange={e => setPassword(e.target.value)} //425
          />
        </div>

        <input
          type="submit"
          value="Log in"
          className="bg-sky-700 mb-5 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/registrar"
        >You do not have an account? Sign up</Link>

        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/olvide-password"
        >I forgot my password</Link>
      
      </nav>
    </>
  )
}

export default Login