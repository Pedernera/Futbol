import React from 'react'
import './BotonFlotante.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
export default function BotonFlotante({text, funcion}) {
  return (
          <>
            <button className='btn-float' onClick={()=>funcion()}>
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              <span className='tooltip'>{text}</span>
            </button>
           
          </>
          
  )
}
