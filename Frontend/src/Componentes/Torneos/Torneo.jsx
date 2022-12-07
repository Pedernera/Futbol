import React, {useState} from 'react'
import { useDataContext } from '../../Context/GlobalContext'
import BotonFlotante from '../BotonFlotante/BotonFlotante'
import FormTorneo from '../FormTorneo/FormTorneo'
import Modal from '../Modal/Modal'
import TarjetaTorneo from '../TarjetaTorneo/TarjetaTorneo'

export default function  Torneo() {
  const [show, setShow] = useState(false)
  const {torneos} =  useDataContext()
  const [edit, setEdit] = useState(false)

    function handleShow(){
      setShow(!show)
      setEdit(false)
    }
    
    function editar( EditTorneo){
      setShow(!show)
      setEdit(EditTorneo)
    }
  return (
    <div className='container'>
      {torneos.map(t=>(<TarjetaTorneo key={t.id} torneo={t} editar={editar}/>))}
      <BotonFlotante text={'Agregar Torneo'} funcion ={handleShow}></BotonFlotante>
      <Modal show={show} handleShow={handleShow}  edit={edit} text='Torneo'>
        <FormTorneo handleShow={handleShow} edit={edit}></FormTorneo>
      </Modal>
    </div>
  )
}
