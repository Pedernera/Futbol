import React from 'react'
import {Link} from 'react-router-dom'
import './Menu.css'
export default function Menu() {
  
  
  return (
    <div className='menu'>
        <Link to={'/'}>
          <img src={`http://localhost:8000/images/fp.png`} alt="" />
        </Link>
        <ul>
          <li> <Link to={'/equipos'} className={'link'}>Equipos</Link> </li>
          
          <li> <Link to={'/torneos'} className={'link'}>Torneos</Link> </li>
                 
          <li> <Link to={'/jugadores'} className={'link'}>Jugadores</Link> </li>

          <li> <Link to={'/estadios'} className={'link'}>Estadios</Link> </li>
        </ul>
    </div>
  )
}
