const express = require('express')
const conexion = require('../conexion')
const router = express.Router()
const fs = require('fs')
router.get('/',(req,res)=>{
    const sql ='SELECT * FROM estadio'
    conexion.query(sql,(error, result)=>{
        if(error){
            res.send('error estadios')
        }else{
            res.json(result)
        }
    })
})

router.get('/id',(req,res)=>{
    const idEstadio=req.params.id
    const sql = 'SELECT * FROM estadio WHERE id=?'
    conexion.query(sql,[idEstadio],(error,result)=>{
        if(error){
            res.send('error estadio id')
        }else{
            res.json(result)
        }
    })
})

router.post('/',(req,res)=>{
    const sql = `INSERT INTO estadio (id,nomEstadio, capacidad,imgEstadio,Equipo_id)
                VALUES( ?,?,?,?,?)`
    const id = req.body.id
    const nomEstadio = req.body.nomEstadio
    const capacidad = parseInt(req.body.capacidad)
    const imgEstadio = req.files.imgEstadio
    const Equipo_id = parseInt(req.body.Equipo_id)
    const newName = id + imgEstadio.name
    
    imgEstadio.mv( `./public/images/estadios/${newName}`,(err)=>{
        if(err){  console.log(err)}
    })

    conexion.query(sql, [id,nomEstadio,capacidad,newName,Equipo_id], (err, result)=>{
        if(err){
            console.log(err)
            res.status(401).json({message:'Error al crear Estadio'})
        }else{
            res.status(200).json({message:'Estadio creado'})
        }
    })

})

router.put('/:id', (req, res)=>{
    let sql= `UPDATE estadio SET  nomEstadio=?, capacidad=?`
    
    let values = [req.body.nomEstadio, req.body.capacidad]
    if(req.files){
        const sqlCurrentImage = `SELECT imgEstadio
                                FROM estadio
                                WHERE id=?`;
        conexion.query(sqlCurrentImage,[req.params.id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                const fileToDelete = `./public/images/estadios/${result[0].imgEstadio}`;
                fs.unlink(fileToDelete,(err)=>{
                    if(err){
                        
                        console.log('error al borrar archivo')
                    }else{
                        console.log('archivo borrado')
                    }
                })
            }
        })
        
        const imgEstadio = req.files.imgEstadio
        newName = req.params.id + imgEstadio.name
        imgEstadio.mv( `./public/images/estadios/${newName}`,(err)=>{
            if(err){  console.log(err)}
        })
        sql += `, imgEstadio=?`;
        values.push(newName)
    }

    sql +='WHERE id=?'
    values.push(parseInt(req.params.id))
    conexion.query(sql,values,(err, result)=>{
        if(err){
            console.log(err)
            res.status(401).json({message:'Error al editar Estadio'})
        }else{
            res.status(200).json({message:'Estadio modificado'})
        }
    })
})

router.delete('/:id',(req,res)=>{
    const sql = `DELETE FROM estadio WHERE id=?`
    const id = req.params.id
    const sqlCurrentImage = `SELECT imgEstadio FROM estadio WHERE id=?`;
    
    conexion.query(sqlCurrentImage,[id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                const fileToDelete = `./public/images/estadios/${result[0].imgEstadio}`;
                fs.unlink(fileToDelete,(err)=>{
                    if(err){
                        
                        console.log('error al borrar archivo')
                    }else{
                        console.log('archivo borrado')
                    }
                })
            }
    })
    conexion.query(sql, [id],(err, result)=>{
        if(err){
            console.log(err)
            res.json({
                status:'error',
                message:'error al eliminar estadio',
            })
        }else{
            res.json({
                status:'ok',
                message:'estadio eliminado',
            })
        }
    })
})
module.exports = router