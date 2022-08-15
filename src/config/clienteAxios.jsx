import axios from 'axios'

const clienteAxios = axios.create({ //424
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios;