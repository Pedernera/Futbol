import { createContext, useReducer,useContext } from "react";
import appReducer from "./AppReducer";

const initialState = {
  jugadores: [],
  jugador: false,
  equipos: [],
  estadios: [],
  partidos: [],
  posiciones:[],
  torneos:[],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const obtenerDatos = async () =>{
    getJugadores()
    getEquipos()
    getEstadios()
    getPartidos()
    getPosiciones()
    getTorneos()
  }

  const getJugadores = async () => {
    try {
        const url='http://localhost:8000/jugador';
        const response= await fetch(url)
        const data = await response.json()
        dispatch({ type:  "GET_JUGADORES", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getEquipos= async () => {
    try {
        const url='http://localhost:8000/equipo';
        const response= await fetch(url)
        const data = await response.json()
        dispatch({ type:  "GET_EQUIPOS", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getEstadios = async () =>{
    try {
        const url ='http://localhost:8000/estadio'
        const response = await fetch(url)
        const data = await response.json()
        dispatch({ type: "GET_ESTADIOS", payload: data})
    } catch (error) {
        console.log(error)  
    }
  }

  const getPartidos = async () =>{
    try {
        const url ='http://localhost:8000/partido'
        const response = await fetch(url)
        const data = await response.json()
        dispatch({ type: "GET_PARTIDOS", payload: data})
    } catch (error) {
        console.log(error)
    }
  }
  const getPosiciones = async () =>{
    try {
        const url ='http://localhost:8000/posicion'
        const response = await fetch(url)
        const data = await response.json()
        dispatch({ type: "GET_POSICIONES", payload: data})
    } catch (error) {
        console.log(error)
    }
  }

  const getTorneos = async () =>{
    try {
      fetch('http://localhost:8000/torneo').then(response => response.json()).then(data =>{
        for(let i=0; i < data.length; i++){
          fetch(`http://localhost:8000/torneoEquipo/${data[i].id}`).then(response => response.json()).then(dato=>{
            data[i].equipos = dato
            dispatch({ type: "GET_TORNEOS", payload: data})
          })
        }
      })   
  } catch (error) {
      console.log(error)
  }
  }

  const getJugador = async (id) => {
    try {
      const url='http://localhost:8000/jugador/'+ id;
        const response= await fetch(url)
        const data = await response.json()
        dispatch({ type:  "GET_JUGADOR", payload: data });
    } catch (error) {}
  };
  const numAleatorio = (array) =>{
    let num =  1 + Math.floor(Math.random() * 2147483645) 
    if(array.find(j => j.id === num)){
      return numAleatorio()
    }else{
      return num;
    }
  }

  //FUNCIONES PARA CREAR
  const addJugador = async (formData,jugador) => {
    jugador.id=  numAleatorio(state.jugadores)
    formData.append('id', jugador.id)
    let url='http://localhost:8000/jugador';
      fetch(url,{method:'POST', body: formData})
              .then(response => response.json())
              .then(data => console.log(data))
              .then(jugador.img_jugador =jugador.id + jugador.img_jugador.name, dispatch({type: "ADD_JUGADOR", payload: jugador}))
  }

  const addEquipo = async (formData, equipo) =>{
    equipo.id = numAleatorio(state.equipos)
    formData.append('id',equipo.id)
    let url='http://localhost:8000/equipo'
    fetch(url,{method:'POST', body: formData})
              .then(response=>response.json())
              .then(data => console.log(data))
              .then(equipo.escudo = equipo.id + equipo.escudo.name, dispatch({type:"ADD_EQUIPO", payload: equipo}))
  }

  const addEstadio = async (formData, estadio) =>{
    estadio.id = numAleatorio(state.estadios)
    formData.append('id',estadio.id)
    let url='http://localhost:8000/estadio'
    fetch(url,{method:'POST', body: formData})
              .then(response=>response.json())
              .then(data => console.log(data))
              .then(estadio.imgEstadio = estadio.id + estadio.imgEstadio.name, dispatch({type:"ADD_ESTADIO", payload: estadio}))
  }

  const addTorneo = async (formData, torneo, equipos) =>{
    torneo.id = numAleatorio(state.torneos)
    formData.append('id',torneo.id)
    let url = 'http://localhost:8000/torneo'

    fetch(url,{method:'POST',body:formData})
          .then(response => response.json())
          .then(data => {
            if(data.message === 'Torneo Creado'){
              torneo.equipos = []
              url += 'Equipo'
              for(let i=0; i < equipos.length; i++){
                torneo.equipos.push(equipos[i].id)
                const newFormData = new FormData()
                newFormData.append('idTorneo', torneo.id)
                newFormData.append('idEquipo', equipos[i].id)
                fetch(url, {method:'POST',body:newFormData})
                .then(response => response.json())
                .then(data => console.log(data))
              }
            }
          })
          .then(dispatch({type:'ADD_TORNEO', payload: torneo}))
  }

  //FUNCIONES PARA EDITAR
  const editJugador = async (formData,jugador) =>{
    if(jugador.img_jugador.name){
      jugador.img_jugador =jugador.id + jugador.img_jugador.name
    }
    let url=`http://localhost:8000/jugador/${jugador.id}`;
      fetch(url,{method:'PUT', body: formData})
              .then(response => response.json())
              .then(data => console.log(data))
              dispatch({type: "EDIT_JUGADOR", payload: jugador})
  }

  const editEquipo = async (formData, equipo)=>{
    if(equipo.escudo.name){
      equipo.escudo = equipo.id + equipo.escudo.name
    }

    let url = `http://localhost:8000/equipo/${equipo.id}`;
    fetch(url,{method:'PUT', body: formData})
    .then(response => response.json())
    .then(data => console.log(data))
    dispatch({type: "EDIT_EQUIPO", payload:equipo})
  }

  const editEstadio = async (formData, estadio)=>{
    if(estadio.imgEstadio.name){
      estadio.imgEstadio = estadio.id + estadio.imgEstadio.name
    }

    let url = `http://localhost:8000/estadio/${estadio.id}`;
    fetch(url,{method:'PUT', body: formData})
    .then(response => response.json())
    .then(data => console.log(data))
    dispatch({type: "EDIT_ESTADIO", payload:estadio})

  }
  //FUNCIONES PARA ELIMINAR
  const deleteJugador = async (id) =>{
    let url='http://localhost:8000/jugador/'+ id;
    fetch(url, {method:'DELETE'})
    .then(response => response.json())
    .then(data => console.log(data))
    dispatch({type:"DELETE_JUGADOR", payload:id})
  }
  const deleteEquipo = async (id) =>{
    let urlElimJugadores = 'http://localhost:8000/jugador/equipo/' + id
    let urlElimEquipo ='http://localhost:8000/equipo/' + id;
    fetch(urlElimJugadores, {method:'DELETE'})
    .then(response => response.json())
    .then(data => {
      if(data.status === 'ok'){
        fetch(urlElimEquipo, {method:'DELETE'})
        .then(response => response.json())
        .then(data => console.log(data))
        dispatch({type:"DELETE_EQUIPO", payload:id})
      }
    })
  }
  const deleteEstadio = async (id) =>{
    let url='http://localhost:8000/estadio/'+ id;
    fetch(url, {method:'DELETE'})
    .then(response => response.json())
    .then(data => console.log(data))
    dispatch({type:"DELETE_ESTADIO", payload:id})
  }

  const deleteTorneo = async (id) =>{
    let urlElimTorneoEquipo = 'http://localhost:8000/torneoEquipo/' + id
    let urlElimTorneo ='http://localhost:8000/torneo/' + id;
    fetch(urlElimTorneoEquipo, {method:'DELETE'})
    .then(response => response.json())
    .then(data => {
      if(data.status === 'ok'){
        fetch(urlElimTorneo, {method:'DELETE'})
        .then(response => response.json())
        .then(data => console.log(data))
        dispatch({type:"DELETE_TORNEO", payload:id})
      }
    })
  }
  return (
    <GlobalContext.Provider
      value={{
        jugadores: state.jugadores,
        jugador: state.jugador,
        equipos: state.equipos,
        estadios: state.estadios,
        partidos: state.partidos,
        posiciones: state.posiciones,
        torneos: state.torneos,
        getJugadores,
        getJugador,
        obtenerDatos,
        addJugador,
        addEquipo,
        addEstadio,
        addTorneo,
        editJugador,
        editEquipo,
        editEstadio,
        deleteJugador,
        deleteEquipo,
        deleteEstadio,
        deleteTorneo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useDataContext(){
  const context = useContext(GlobalContext)
  return context
}