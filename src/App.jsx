import { BrowserRouter, Routes, Route } from "react-router-dom" //404

import AuthLayout from "./layout/AuthLayout" //404
import RutaProtegida from "./layout/RutaProtegida" //431

import Login from "./paginas/Login" //404
import Registrar from "./paginas/Registrar" //404
import OlvidePassword from "./paginas/OlvidePassword" //404
import NuevoPassword from "./paginas/NuevoPassword" //404
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"//404
import Proyectos from "./paginas/Proyectos" //431
import NuevoProyecto from "./paginas/NuevoProyecto"//433
import Proyecto from "./paginas/Proyecto" //440
import EditarProyecto from "./paginas/EditarProyecto" //444
import NuevoColaborador from "./paginas/NuevoColaborador" //468

import { AuthProvider } from "./context/AuthProvider" //427
import {ProyectosProvider} from "./context/ProyectosProvider" 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider /*427*/>
        <ProyectosProvider /*434*/>
          <Routes> 
            <Route  /*404 Area pública*/ path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/> 
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
            </Route>

            <Route /*431 Area privada*/ path="/proyectos" element={<RutaProtegida/>}>
              <Route index element={<Proyectos/>} />
              <Route path="crear-proyecto" element={<NuevoProyecto/>} /*433*//>
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador/>}/*463*//>
              <Route path=":id" element={<Proyecto/>} /*440*//>
              <Route path="editar/:id" element={<EditarProyecto/>} /*444*//>
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
  
}

export default App
