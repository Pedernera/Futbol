import React from 'react'
import './TarjetaTorneo.css'
import { useDataContext } from '../../Context/GlobalContext'
export default function TarjetaTorneo({torneo, editar,num}) {
    const {deleteTorneo, equipos} = useDataContext()
    function buscarEquipo(idEquipo){
       for(let i=0; i < equipos.length; i++){
            if(equipos[i].id === idEquipo){
                return equipos[i].nomEquipo
            }
       }
    }

  return (
    <div className="card-torneo">
        <button onClick={()=>{deleteTorneo(torneo.id)}}>Eliminar</button>
        <table>
        <caption>{torneo.nomTorneo}</caption>
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Equipo</th>
                    <th>Pts</th>
                    <th>J</th>
                </tr>
            </thead>
            <tbody>
                
                    {torneo.equipos.map((e, index)=>(
                        
                        <tr key={e.Equipo_Id}>
                            <td>{index +1}</td>
                            <td>{buscarEquipo(e.Equipo_Id)}</td>
                            <td>12</td>
                            <td>10</td>
                        </tr>
                        
                    ))}
                
            </tbody>
        </table>
  </div>
  )
}
