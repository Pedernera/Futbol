import React  from 'react'
import { useState } from 'react'
import {useDataContext} from '../../Context/GlobalContext'
import BotonFlotante from '../BotonFlotante/BotonFlotante'
import FormJugador from '../FormJugador/FormJugador'
import Modal from '../Modal/Modal'
import TarjetaJugador from '../TarjetaJugador/TarjetaJugador'
import './ListaJugadores.css'
export default function ListaJugadores() {
    const [show, setShow] = useState(false)
    const {jugadores} =  useDataContext()
    const [edit, setEdit] = useState(false)

    function handleShow(){
      setShow(!show)
      setEdit(false)
    }
    
    function editar( EditJugador){
      setShow(!show)
      setEdit(EditJugador)
    }
  return (
   <div className='container'>
     {jugadores.map(j=>(<TarjetaJugador key={j.id} jugador={j} setEdit={setEdit} editar={editar}/>))}
     <BotonFlotante text={'agregar jugador'} funcion ={handleShow}></BotonFlotante>
     <Modal show={show} handleShow={handleShow}  edit={edit} text='Jugador'>
        <FormJugador handleShow={handleShow} edit={edit}></FormJugador>
     </Modal>
   </div>
     
  )
}

