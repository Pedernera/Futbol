import React from 'react'
import './TarjetaEstadio.css'
import { useDataContext } from '../../Context/GlobalContext'
export default function TarjetaEstadio({estadio, editar}) {
  const {deleteEstadio} = useDataContext()
  return (
    <div className='tarj-est'>
        <div className='header'>
          <h2>{estadio.nomEstadio}</h2>
          <h6>Capacidad :  {estadio.capacidad}</h6>
        </div>
        <img src={`http://localhost:8000/images/estadios/${estadio.imgEstadio}`} alt={` imagen ${estadio.nomEstadio}`} />
        <div className='footer'>
          <button onClick={()=>{deleteEstadio(estadio.id)}}>Eliminar</button>
          <button onClick={()=>{editar(estadio)}}>Editar</button>
        </div>
    </div>
  )
}
