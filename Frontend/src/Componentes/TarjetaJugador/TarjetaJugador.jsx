import React from 'react'
import './TarjetaJugador.css'
import { useDataContext } from '../../Context/GlobalContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
export default function TarjetaJugador({jugador, editar}) {
  const {equipos, deleteJugador} = useDataContext()
    let equipo = equipos.filter(e => e.id === jugador.Equipo_id)
  return (
    <>
   {equipos.length > 0 &&(
    <div className={`card-jugador ${equipo[0].nomEquipo.replace(/\s+/g, '').toLowerCase()}`}>
    <div className='header'>
      {jugador.nombre + ' ' + jugador.apellido }
    </div>
    <div className='body'>
      <img src={`http://localhost:8000/images/escudos/${equipo[0].escudo}`} alt={`logo ${equipo[0].nomEquipo}`} id='logo'/>
      <img src={`http://localhost:8000/images/jugadores/${jugador.img_jugador}`} alt={` imagen ${jugador.apellido + ' '+ jugador.nombre}`} />
      <h6 id='num'>{jugador.dorsal}</h6>
    </div>
    <div className='footer'>
      <button className={`${equipo[0].nomEquipo.replace(/\s+/g, '').toLowerCase()}`} onClick={()=>{editar(jugador)}}>
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
      </button>
      <button className={`${equipo[0].nomEquipo.replace(/\s+/g, '').toLowerCase()}`} onClick={()=> deleteJugador(jugador.id)}>
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
      </button>
    </div>
  </div>
   )}</>

  )
}
