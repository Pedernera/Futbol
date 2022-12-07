const express = require('express');
const conexion = require('../conexion');
const fs = require('fs')
const router = express.Router();

router.get('/',(req,res)=>{
       const sql =`SELECT * FROM jugador ORDER BY Equipo_id`;

       conexion.query(sql,(error,result)=>{
           if(error){
               res.send('error jugador')
           }else{
               res.json(result)
           }
       })
})

router.get('/:id',(req,res)=>{
    const idJugador = req.params.id
    const sql ='SELECT * FROM jugador WHERE id=?';
    conexion.query(sql,[idJugador],(error,result)=>{
        if(error){
            res.send('error jugador id')
        }else{
            res.json(result)
        }
    })
})

router.post('/',(req,res)=>{
    const sql = `INSERT INTO jugador (id,nombre, apellido, edad, dorsal, img_jugador ,Posicion_id, Equipo_id)
                VALUES( ?,?,?,?,?,?,?,?)`
    const id = req.body.id
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const edad = parseInt(req.body.edad)
    const dorsal = parseInt(req.body.dorsal)
    const img_jugador = req.files.img_jugador
    const Posicion_id = parseInt(req.body.Posicion_id)
    const Equipo_id = parseInt(req.body.Equipo_id)
    const newName = id + img_jugador.name
    
    img_jugador.mv( `./public/images/jugadores/${newName}`,(err)=>{
        if(err){  console.log(err)}
    })

    conexion.query(sql, [id,nombre, apellido, edad, dorsal,newName, Posicion_id, Equipo_id], (err, result)=>{
        if(err){
            console.log(err)
            res.status(401).json({message:'Error al crear jugador'})
        }else{
            res.status(200).json({message:'Jugador creado'})
        }
    })

})

router.put('/:id', (req, res)=>{
    let sql= `UPDATE jugador SET  nombre=?, 
                                    apellido=?,
                                    edad=?,
                                    dorsal=?`
    
    let values = [req.body.nombre, req.body.apellido, req.body.edad, req.body.dorsal]
    if(req.files){
        const sqlCurrentImage = `SELECT img_jugador
                                FROM jugador
                                WHERE id=?`;
        conexion.query(sqlCurrentImage,[req.params.id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                const fileToDelete = `./public/images/jugadores/${result[0].img_jugador}`;
                fs.unlink(fileToDelete,(err)=>{
                    if(err){
                        
                        console.log('error al borrar archivo')
                    }else{
                        console.log('archivo borrado')
                    }
                })
            }
        })
        
        const img_jugador = req.files.img_jugador
        newName = req.params.id + img_jugador.name
        img_jugador.mv( `./public/images/jugadores/${newName}`,(err)=>{
            if(err){  console.log(err)}
        })
        sql += `, img_jugador=?`;
        values.push(newName)
    }

    sql +='WHERE id=?'
    values.push(parseInt(req.params.id))
    conexion.query(sql,values,(err, result)=>{
        if(err){
            console.log(err)
            res.status(401).json({message:'Error al editar jugador'})
        }else{
            res.status(200).json({message:'Jugador modificado'})
        }
    })
})

router.delete('/equipo/:id',(req,res)=>{
    const sqlJugadoresEliminar = `DELETE FROM jugador WHERE Equipo_id =?`
    const sqlCurrentImage = `SELECT img_jugador FROM jugador WHERE Equipo_id=?`;
    const idEquipo = req.params.id

    conexion.query(sqlCurrentImage,[idEquipo],(err,result)=>{
        console.log(result)
        if(err){
            console.log(err);
        }else{
            result.forEach(res => {
                const fileToDelete = `./public/images/jugadores/${res.img_jugador}`;
                fs.unlink(fileToDelete,(err)=>{
                if(err){
                    console.log('error al borrar archivo')
                }else{
                    console.log('archivo borrado')
                }
                })
            });
        }
     })

     conexion.query(sqlJugadoresEliminar, [idEquipo],(err, result)=>{
        if(err){
            console.log(err)
            res.json({
                status:'error',
                message:'error al eliminar jugador',
            })
        }else{
            res.json({
                status:'ok',
                message:'jugador eliminado',
            })
        }
    })

})

router.delete('/:id',(req,res)=>{
    const sql = `DELETE
                 FROM jugador
                 WHERE id=?`
    const id = req.params.id
    const sqlCurrentImage = `SELECT img_jugador
                                FROM jugador
                                WHERE id=?`;
    
    conexion.query(sqlCurrentImage,[id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                const fileToDelete = `./public/images/jugadores/${result[0].img_jugador}`;
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
                message:'error al eliminar jugador',
            })
        }else{
            res.json({
                status:'ok',
                message:'jugador eliminado',
            })
        }
    })
})

module.exports=router