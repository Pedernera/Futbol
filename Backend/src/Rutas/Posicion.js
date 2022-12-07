const express = require('express');
const conexion = require('../conexion')
const router = express.Router();

router.get('/',(req,res)=>{
       const sql =`SELECT * FROM posicion`;

       conexion.query(sql,(error,result)=>{
           if(error){
               res.send('error posicion')
           }else{
               res.json(result)
           }
       })
})

router.get('/:id',(req,res)=>{
    const idPosicion = req.params.id
    const sql ='SELECT * FROM jugador WHERE id=?';
    conexion.query(sql,[idPosicion],(error,result)=>{
        if(error){
            res.send('error posicion id')
        }else{
            res.json(result)
        }
    })
})

module.exports=router