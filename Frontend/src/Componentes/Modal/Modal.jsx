import React from 'react'
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
export default function Modal({children,show, text, edit, handleShow}) {
  return (
    <>
    {show &&
        <div className='modal'>
            <div className="contenedorModal">
                <div className='header-modal'>
                <h2 className='title-modal'>{edit ? `Editar ${text}`: `Nuevo ${text}`}</h2>
                <button className='btn-close-modal' onClick={handleShow}>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </button>
                </div>
                <div className='body-modal'>
                {children}
                </div>
            </div>
        </div>
    }
    </>
  )
}
