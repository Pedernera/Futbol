import React,{useState} from 'react'
import {useDataContext} from '../../Context/GlobalContext'
export default function FormEquipo({handleShow, edit}) {
  const [equipo, setEquipo] = useState(edit ? edit :{nomEquipo:'', anioFundado:'', escudo:null})
    const {addEquipo, editEquipo} = useDataContext()
    
    function handleEquipo(e){
        if(e.target.name === 'escudo'){
            return setEquipo({...equipo, [e.target.name]: e.target.files[0]})     
        }else {
            return   setEquipo({...equipo, [e.target.name]: e.target.value}) 
        } 
    }

    function save (e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('nomEquipo', equipo.nomEquipo)
        formData.append('anioFundado', equipo.anioFundado)
        formData.append('escudo', equipo.escudo)

        if(edit){
            formData.append('id', edit.id)
            editEquipo(formData, equipo)
        }else{
            addEquipo(formData, equipo)
        }
        handleShow()
    }
  return (
    <>
        <form>
            <div className='row'>
                <div className="col">
                <label>Nombre del Equipo</label>
                </div>
                <div className="col">
                    <input type="text" name='nomEquipo' value={equipo.nomEquipo} onChange={handleEquipo} autoComplete='off'/>
                </div>
            </div>
            <div className="row">
                <div className='col'>
                <label>Año Fundado</label>
                </div>
                <div className="col">
                    <input type="date" name='anioFundado' onChange={handleEquipo}/>
                </div>
            </div>
            <div className='row'>
                <div className="col">
                <label >Imagen</label>
                </div>
                <div className="col file">
                <input type="file" name='escudo' onChange={handleEquipo}/>
                </div>
            </div>
            <div className='footer-modal'>
                <button onClick={save}>Guardar</button>
                <button onClick={handleShow}>Cerrar</button>
            </div>
        </form>
    </>
  )
}
