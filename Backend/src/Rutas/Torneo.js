const express = require('express');
const conexion = require('../conexion')
const router = express.Router();

router.get('/',(req,res)=>{
       const sql =`SELECT * FROM torneo`;

       conexion.query(sql,(error,result)=>{
           if(error){
               res.send('error torneo')
           }else{
               res.json(result)
           }
       })
})

router.get('/:id',(req,res)=>{
    const idTorneo = req.params.id
    const sql ='SELECT * FROM torneo WHERE id=?';
    conexion.query(sql,[idTorneo],(error,result)=>{
        if(error){
            res.send('error torneo id')
        }else{
            res.json(result)
        }
    })
})

router.post('/',(req,res)=>{
    const sql='INSERT INTO torneo (id, nomTorneo) VALUES(?,?)'
    const id = req.body.id
    const nomTorneo = req.body.nomTorneo

    conexion.query(sql, [id, nomTorneo], (err, result) =>{
        if(err){
            console.log(err)
            res.status(401).json({message:'Error al crear torneo'})
        }else{
            res.status(200).json({message:'Torneo Creado'})
        }
    })
})

router.put('/:id', (req,res)=>{
    const sql='UPDATE torneo  SET nomTorneo=? WHERE id=?'
    const values = [req.body.nomTorneo, req.params.id]

    conexion.query(sql, values,(err, result) =>{
        if(err){
            console.log(err)
            res.status(401).json({message:'Error al editar torneo'})
        }else{
            res.status(200).json({message:'Torneo modificado'})
        }
    })
})

router.delete('/:id', (req,res)=>{
    const sql ='DELETE FROM torneo  WHERE id=?'
    const id = req.params.id
    conexion.query(sql, [id],(err, result)=>{
        if(err){
            console.log(err)
            res.json({
                status:'error',
                message:'error al eliminar torneo',
            })
        }else{
            res.json({
                status:'ok',
                message:'torneo eliminado',
            })
        }
    })
})

module.exports=router