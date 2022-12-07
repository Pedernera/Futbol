import React, {useState} from 'react'
import { useDataContext } from '../../Context/GlobalContext'
export default function FormEstadio({handleShow, edit}) {
    
    const {equipos, estadios,addEstadio, editEstadio} = useDataContext()
    const [estadio, setEstadio] = useState(edit ? edit : {nomEstadio:'', capacidad:0, imgEstadio:'', Equipo_id:false})
    const [previewImgPub , setPreviewImgPub] = useState('')
    function getEquipos(){
        let equiposSinEstadio = []
        for(let i=0; i < estadios.length; i++){
            for(let x=0; x < equipos.length; x++){
             if(estadios[i].Equipo_id === equipos[x].id){
                equiposSinEstadio.push(equipos[x])
             }  
            }
        }

        if(!edit){
        equiposSinEstadio = equipos.filter(e => equiposSinEstadio.includes(e) === false)
        }
        return equiposSinEstadio.map((e)=>(
        <option key={e.id} value={e.id}>{e.nomEquipo}</option>
        )) 
    }

const handleEstadio = (e) =>{
    if(e.target.name === 'imgEstadio'){
        setPreviewImgPub(URL.createObjectURL(e.target.files[0]))
        return   setEstadio({...estadio, [e.target.name]: e.target.files[0]})  
    }else if(e.target.name === 'nomEstadio'){
        return   setEstadio({...estadio, [e.target.name]: e.target.value})  
    }else{
        return   setEstadio({...estadio, [e.target.name]: parseInt(e.target.value)})
    }
}

const save = (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('nomEstadio',estadio.nomEstadio)
    formData.append('capacidad', estadio.capacidad)
    formData.append('imgEstadio',estadio.imgEstadio)
    formData.append('Equipo_id',estadio.Equipo_id)

    if(edit){
        formData.append('id', edit.id)
        editEstadio(formData, estadio)
    }else{
        addEstadio(formData, estadio)
    }
    handleShow()
}
  return (
    <>
        <form>
            <div className='row'>
                <div className="col">
                <label>Nombre del Estadio</label>
                <input type="text" name='nomEstadio' value={estadio.nomEstadio} onChange={handleEstadio} autoComplete='off'/>
                </div>
                <div className="col">
                <label>Capacidad</label>
                <input type="number" name='capacidad' value={estadio.capacidad ? estadio.capacidad : ''} onChange={handleEstadio} />
                </div>
            </div>
            <div className='row'>
                <div className="col">
                    <label >Imagen</label>
                    <input type="file" name='imgEstadio' onChange={handleEstadio}/>
                </div>

                <div className="col file">
                    <label>Equipo</label>
                    <select name="Equipo_id" onChange={handleEstadio} defaultValue={edit ? edit.Equipo_id : false} disabled={edit ? true : false}>
                        <option >Seleccionar</option>
                        { getEquipos()}
                    </select>
                </div>
            </div>
            <div className='previewimg'>
                     {previewImgPub && (
                    <img src={previewImgPub} alt="previewimg"/>
                    )}
            </div>
            <div className='footer-modal'>
                <button onClick={save}>Guardar</button>
                <button onClick={handleShow}>Cerrar</button>
            </div>
        </form>
    </>
  )
}
