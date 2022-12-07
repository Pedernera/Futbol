import React from 'react'
import './TarjetaEquipo.css'
import {useDataContext} from '../../Context/GlobalContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
export default function TarjetaEquipo({equipo, editar}) {
  const {jugadores, deleteEquipo} = useDataContext()
  const arqueros = jugadores.filter(j => j.Posicion_id === 1 && j.Equipo_id === equipo.id)
  const defensores = jugadores.filter(j => j.Posicion_id === 2 && j.Equipo_id === equipo.id)
  const mediocampistas = jugadores.filter(j => j.Posicion_id === 3 && j.Equipo_id === equipo.id)
  const delanteros = jugadores.filter(j => j.Posicion_id === 4 && j.Equipo_id === equipo.id) 
  return (
    <div className={`card-equipo ${equipo.nomEquipo.replace(/\s+/g, '').toLowerCase()}`}>
        <div className='titulo'>
          <h3 className='nombre-equipo'>{equipo.nomEquipo}</h3>
          <div className='btn'>
          <button className={equipo.nomEquipo.replace(/\s+/g, '').toLowerCase()}  onClick={()=>{editar(equipo)}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
          <button className={equipo.nomEquipo.replace(/\s+/g, '').toLowerCase()}  onClick={()=>{deleteEquipo(equipo.id)}}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
          </div>
        </div>
        <div className="body">
        <img src={`http://localhost:8000/images/escudos/${equipo.escudo}`} alt={equipo.nomEquipo} className='escudo'/>
        <div id='plantel'>
        <h4>Plantel</h4>
          <div id="jugadores">
                <div id='arqueros'>
                    <h5>Aqueros</h5>
                    <ul>
                      {arqueros.map(j =>(
                        <li key={j.id}><div>{j.dorsal + ' ' + j.nombre + ' ' + j.apellido}</div></li>
                      ))}
                    </ul>
                </div>
                <div id='defensores'>
                    <h5>Defensores</h5>
                    <ul>
                        {defensores.map(j =>(
                          <li key={j.id}><div>{j.dorsal + ' ' + j.nombre + ' ' + j.apellido}</div></li>
                        ))}
                    </ul>
                </div>
                <div id='mediocampista'>
                    <h5>Mediocampista</h5>
                    <ul>
                      {mediocampistas.map(j =>(
                        <li key={j.id}><div>{j.dorsal + ' ' + j.nombre + ' ' + j.apellido}</div></li>
                      ))}
                    </ul>
                </div>
                <div id='delantero'>
                    <h5>Delanteros</h5>
                    <ul>
                      {delanteros.map(j =>(
                        <li key={j.id}><div>{j.dorsal + ' ' + j.nombre + ' ' + j.apellido}</div></li>
                      ))}
                    </ul>
                </div>
          </div>
        </div>
        </div>
    </div>
  )
}