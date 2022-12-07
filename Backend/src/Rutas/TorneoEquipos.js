const express = require('express');
const conexion = require('../conexion')
const router = express.Router();



router.get('/:id',(req,res)=>{
    const idTorneo = req.params.id
    const sql ='SELECT Equipo_Id FROM torneo_has_equipo WHERE Torneo_id=?';
    conexion.query(sql,[idTorneo],(error,result)=>{
        if(error){
            res.send('error TorneoEquipo id')
        }else{
            res.json(result)
        }
    })
})

router.post('/',(req,res)=>{
    const sql='INSERT INTO torneo_has_equipo (Torneo_id, Equipo_id) VALUES(?,?)'
    let idTorneo = req.body.idTorneo
    let idEquipo= req.body.idEquipo


    conexion.query(sql, [idTorneo, idEquipo], (err, result) =>{
        if(err){
            console.log(err)
            res.status(401).json({message:'Error al agregar equipo en el torneo'})
        }else{
            res.status(200).json({message:'Equipo agregado en el torneo'})
        }
    })
})

router.delete('/:id', (req,res)=>{
    
    const sql = "DELETE FROM torneo_has_equipo WHERE Torneo_id = ?"
    const Torneo_id = req.params.id
    conexion.query(sql, [Torneo_id],(err, result)=>{
        if(err){
            console.log(err)
            res.json({
                status:'error',
                message:'error al eliminar equipo del torneo',
            })
        }else{
            res.json({
                status:'ok',
                message:'equipo eliminado del torneo',
            })
        }
    })
})
module.exports=router