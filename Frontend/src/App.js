import { useEffect } from "react";
import Inicio from "./Componentes/Inicio/Inicio";
import { useDataContext } from "./Context/GlobalContext";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Equipos from "./Componentes/Equipos/Equipos";
import Menu from "./Componentes/Menu/Menu";
import './App.css'
import Torneo from "./Componentes/Torneos/Torneo";
import ListaJugadores from "./Componentes/ListaJugadores/ListaJugadores";
import Posiciones from "./Componentes/Posiciones/Posiciones";
import Estadios from "./Componentes/Estadios/Estadios";
import FormJugador from "./Componentes/FormJugador/FormJugador";
function App() {
 
  const {obtenerDatos} =  useDataContext()
  useEffect(()=>{
    obtenerDatos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
        <BrowserRouter>
        <Menu></Menu> 
        <Routes>
          <Route path="/"           element={<Inicio/>}/>
          <Route path="/equipos"    element={<Equipos/>}/>
          <Route path="/torneos"    element={<Torneo/>}/>
          <Route path="/jugadores"  element={<ListaJugadores/>}/>
          <Route path="/posiciones" element={<Posiciones/>}/>
          <Route path="/estadios"   element={<Estadios/>}/>
          <Route path="/newJugador" element={<FormJugador/>}/>
        </Routes>
        </BrowserRouter>
       
    </>
  );
}

export default App;
