import React,{useState} from 'react'
import { useDataContext } from '../../Context/GlobalContext'
export default function FormJugador({handleShow, edit}) {
    const {equipos, posiciones, addJugador, editJugador} = useDataContext()

    const [jugador, setJugador]=useState(
        edit ? edit :
        {nombre:'', apellido: '', 
        dorsal: '', edad:'', 
        Posicion_id:'' ,Equipo_id: '', img_jugador:null })

    function handleJugador(e){
        if(e.target.name === 'nombre' || e.target.name === 'apellido' ){
            return setJugador({...jugador, [e.target.name]: e.target.value})    
        }else if(e.target.name === 'img_jugador'){
         return   setJugador({...jugador, [e.target.name]: e.target.files[0]})  
        }else{
            return   setJugador({...jugador, [e.target.name]: parseInt(e.target.value)})
        }
       
    }

    function save(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('nombre', jugador.nombre)
        formData.append('apellido', jugador.apellido)
        formData.append('dorsal', jugador.dorsal)
        formData.append('edad', jugador.edad)
        formData.append('Posicion_id', parseInt(jugador.Posicion_id))
        formData.append('Equipo_id', parseInt(jugador.Equipo_id))
        formData.append('img_jugador',jugador.img_jugador)
        if(edit){
            formData.append('id', edit.id)
            editJugador(formData, jugador)
        }else{
            addJugador(formData, jugador)
        }
        handleShow()
    }
  
  return (
        <>
        <form>
            <div className='row'>
                <div className="col">
                <label>Nombre</label>
                <input type="text" name="nombre" value={jugador.nombre} onChange={handleJugador} autoComplete='off'/>
                </div>
                <div className="col">
                <label >Apellido</label>
                <input type="text" name="apellido" value={jugador.apellido } onChange={handleJugador} autoComplete='off' />
                </div>
            </div>
            <div className='row'>
                <div className="col">
                <label>Dorsal</label>
                <input type="number" name="dorsal" value={jugador.dorsal ? jugador.dorsal : ''} onChange={handleJugador} />
                </div>
                <div className="col">
                <label>Edad</label>
                <input type="number" name="edad" value={jugador.edad ? jugador.edad : ''} onChange={handleJugador}/>
                </div>
            </div>
            <div className='row'>
                <div className="col">
                <label >Equipo</label>
                    <select name="Equipo_id" onChange={handleJugador} defaultValue={ edit ? edit.Equipo_id : false} disabled={edit ? true : false}>
                        <option >Seleccionar</option>
                        {equipos.map(e=>(
                            <option key={e.id} value={e.id}>{e.nomEquipo}</option>
                        ))}
                    </select>
                </div>
                <div className="col">
                <label>Posicion</label>
                    <select name="Posicion_id" onChange={handleJugador} defaultValue={ edit ? edit.Posicion_id : false} disabled={edit ? true : false}>
                        <option >Seleccionar</option>
                        {posiciones.map(p=>(
                            <option key={p.id} value={p.id}>{p.Posicion}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className="col file">
                <label >Imagen</label>
                <input type="file" name="img_jugador"  onChange={handleJugador}/>
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
