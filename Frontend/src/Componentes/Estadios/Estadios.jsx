import React, { useState } from 'react'
import { useDataContext } from '../../Context/GlobalContext'
import BotonFlotante from '../BotonFlotante/BotonFlotante'
import FormEstadio from '../FormEstadio/FormEstadio'
import Modal from '../Modal/Modal'
import TarjetaEstadio from '../TarjetaEstadio/TarjetaEstadio'

export default function Estadios() {
  const [show, setShow] = useState(false)
    const {estadios} =  useDataContext()
    const [edit, setEdit] = useState(false)

    function handleShow(){
      setShow(!show)
      setEdit(false)
    }
    
    function editar( EditEstadio){
      setShow(!show)
      setEdit(EditEstadio)
    }
  return (
    <div className='container'>
        {estadios.map(e => (<TarjetaEstadio key={e.id} estadio={e} editar={editar}></TarjetaEstadio>))}
        <BotonFlotante text={"Agregar Estadio"} funcion ={handleShow}></BotonFlotante>
        <Modal show={show} handleShow={handleShow}  edit={edit} text='Estadio'>
            <FormEstadio handleShow={handleShow} edit={edit}></FormEstadio>
        </Modal>
    </div>
  )
}
