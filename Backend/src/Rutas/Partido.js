const express = require('express');
const conexion = require('../conexion')
const router = express.Router();

router.get('/',(req,res)=>{
       const sql =`SELECT * FROM partido`;

       conexion.query(sql,(error,result)=>{
           if(error){
               res.send('error partido')
           }else{
               res.json(result)
           }
       })
})

router.get('/:id',(req,res)=>{
    const idPartido = req.params.id
    const sql ='SELECT * FROM jugador WHERE idPartido=?';
    conexion.query(sql,[idPartido],(error,result)=>{
        if(error){
            res.send('error partido id')
        }else{
            res.json(result)
        }
    })
})

module.exports=router