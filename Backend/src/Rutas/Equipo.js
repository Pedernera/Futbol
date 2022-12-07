const express = require('express')
const conexion = require('../conexion')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM equipo'
    conexion.query(sql, (error, result) => {
        if (error) {
            res.send('error equipo')
        } else {
            res.json(result)
        }
    })
})

router.get('/:id', (req, res) => {
    const idEquipo = req.params.id
    const sql = 'SELECT * FROM equipo WHERE id=?'
    conexion.query(sql, [idEquipo], (error, result) => {
        if (error) {
            res.send('error equipo id')
        } else {
            res.json(result)
        }
    })
})

router.post('/', (req, res) => {
    const sql = ` INSERT INTO equipo (id, nomEquipo, anioFundado, escudo) 
                VALUES (?,?,?,?)`
    const id = req.body.id
    const nomEquipo = req.body.nomEquipo
    const anioFundado = req.body.anioFundado
    const escudo = req.files.escudo
    const newName = id + escudo.name

    escudo.mv(`./public/images/escudos/${newName}`, (err) => {
        if (err) { console.log(err) }
    })

    conexion.query(sql, [id, nomEquipo, anioFundado, newName], (err, result) => {
        if (err) {
            res.status(401).json({ message: 'Error al crear equipo' })
        } else {
            res.status(200).json({ message: 'Equipo creado' })
        }
    })

})

router.put('/:id', (req, res) => {
    let sql = `UPDATE equipo SET  nomEquipo=?, anioFundado=?`
    let values = [req.body.nomEquipo, req.body.anioFundado]
    if (req.files) {
        const sqlCurrentImage = `SELECT escudo
                                FROM equipo
                                WHERE id=?`;
        conexion.query(sqlCurrentImage, [req.params.id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const fileToDelete = `./public/images/escudos/${result[0].escudo}`;
                fs.unlink(fileToDelete, (err) => {
                    if (err) {

                        console.log('error al borrar archivo')
                    } else {
                        console.log('archivo borrado')
                    }
                })
            }
        })

        const escudo = req.files.escudo
        newName = req.params.id + escudo.name
        escudo.mv(`./public/images/escudos/${newName}`, (err) => {
            if (err) { console.log(err) }
        })
        sql += `, escudo=?`;
        values.push(newName)
    }
    sql += 'WHERE id=?'
    values.push(parseInt(req.params.id))
    conexion.query(sql, values, (err, result) => {
        if (err) {
            console.log(err)
            res.status(401).json({ message: 'Error al editar equipo' })
        } else {
            res.status(200).json({ message: 'Equipo modificado' })
        }
    })
})

router.delete('/:id', (req, res) => {
    const sql = `DELETE
                 FROM equipo
                 WHERE id=?`
    const id = req.params.id
    const sqlCurrentImage = `SELECT escudo FROM equipo WHERE id=?`;

    conexion.query(sqlCurrentImage, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const fileToDelete = `./public/images/escudos/${result[0].escudo}`;
            fs.unlink(fileToDelete, (err) => {
                if (err) {

                    console.log('error al borrar archivo')
                } else {
                    console.log('archivo borrado')
                }
            })
        }
    })
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err)
            res.json({
                status: 'error',
                message: 'error al eliminar equipo',
            })
        } else {
            res.json({
                status: 'ok',
                message: 'equipo eliminado ',
            })
        }
    })
})
module.exports = router