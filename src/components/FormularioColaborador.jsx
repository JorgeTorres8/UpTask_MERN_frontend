import { useState } from "react"
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => { //468 contenido en 469

    const [email, setEmail] = useState(''); //469
    const {mostrarAlerta, alerta, submitColaborador} = useProyectos(); //469

    const handleSubmit = e => { //469
        e.preventDefault();

        if(email === '') {
            mostrarAlerta({
                msg: 'El Email es Obligatorio',
                error: true
            })
            return;
        }

        submitColaborador(email);
    }

    const {msg} = alerta;

  return (
    <form 
        className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
    >
        {msg && <Alerta alerta={alerta}/>}
        <div className='mb-5'>
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='email'
            >Collaborator E-mail
            </label>

            <input
                type="email"
                id="email"
                placeholder='User Email'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <input
            type="submit"
            className='bg-sky-600 hover:bg-sky-700 p-3 w-full text-white uppercase 
            font-bold cursor-pointer transition-colors rounded text-sm'
            value='Search Contributor'
        />
    </form>
  )
}

export default FormularioColaborador