import React, { useState }from 'react'
import { useDataContext } from '../../Context/GlobalContext'
export default function FormTorneo({handleShow, edit}) {
    const {addTorneo, equipos} = useDataContext()
    const [torneo,setTorneo]= useState({nomTorneo:''})
    const [selecEquipos, setSelecEquipos]=useState(equipos.map(e => ({id:e.id, nombre:e.nomEquipo, select:false})))
    const [todos, setTodos]= useState(false)

    const handleTorneo = (e) =>{

        if(e.target.name === 'nomTorneo'){
            setTorneo({...torneo, [e.target.name]: e.target.value})
        }
        if(e.target.name === 'todos'){
            setTodos(e.target.checked)
            setSelecEquipos(selecEquipos.map(equ => {equ.select =e.target.checked; return equ}))
        }else{
            setSelecEquipos(selecEquipos.map(equ => {
                if(equ.nombre === e.target.name){
                    equ.select = e.target.checked
                    return equ
                }else{
                    return equ
                }
            }))
 
            if(selecEquipos.filter(e => e.select === true).length === equipos.length){
                setTodos(true)
            }else{
                setTodos(false)
            }
        }
    }

    function save(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('nomTorneo', torneo.nomTorneo)
        let equipos = selecEquipos.filter(e => e.select)
        if(edit){
            formData.append('id', edit.id)
            // editJugador(formData, torneo)
        }else{
            addTorneo(formData, torneo, equipos)
        }
        handleShow()
    }

  return (
        <form>
            <div className='row'>
                <div className="col">
                    <label>Nombre del Torneo</label>
                </div>
                <div className="col">
                    <input type="text" name="nomTorneo" value={torneo.nomTorneo} onChange={handleTorneo} autoComplete='off'/>
                </div>
            </div>
            <div className="check">
                    <label>Seleccionar Todos</label>
                    <input type="checkbox" name='todos' id="" onChange={handleTorneo} checked={todos}/> 
            </div>
            {selecEquipos.map(e =>(
            <div key={e.id} className="check">
                <label>{e.nombre}</label>
                <input type="checkbox" name={e.nombre} id="" onChange={handleTorneo} checked={e.select} />
            </div>
            ))}
            <div className='footer-modal'>
                <button onClick={save}>Guardar</button>
                <button onClick={handleShow}>Cerrar</button>
            </div>
        </form>
  )
}
