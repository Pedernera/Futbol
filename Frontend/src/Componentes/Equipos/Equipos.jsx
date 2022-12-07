import React,{useState} from 'react'
import {useDataContext} from '../../Context/GlobalContext'
import BotonFlotante from '../BotonFlotante/BotonFlotante'
import FormEquipo from '../FormEquipo/FormEquipo'
import Modal from '../Modal/Modal'
import TarjetaEquipo from '../TarjetaEquipo/TarjetaEquipo'
export default function Equipos() {
  const {equipos} =useDataContext()
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)
  function handleShow(){
    setShow(!show)
    setEdit(false)
  }

  function editar(EditEqui){
    setShow(!show)
    setEdit(EditEqui)
  }

  return (
    <div className='container'>
        {equipos.map(e=>(<TarjetaEquipo key={e.id} equipo ={e} setEdit={setEdit} editar={editar}/>))}
        <BotonFlotante text={'agregar equipo'} funcion={handleShow}></BotonFlotante>
        <Modal show={show} handleShow={handleShow} edit={edit} text='Equipo'>
            <FormEquipo handleShow={handleShow} edit={edit}></FormEquipo>
        </Modal>
    </div>
  )
}
