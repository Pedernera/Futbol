const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')

const jugadorRuta = require('./Rutas/Jugador')
const equipoRuta = require('./Rutas/Equipo')
const estadiosRuta = require('./Rutas/Estadios')
const partidosRutas = require('./Rutas/Partido')
const posicionRutas = require('./Rutas/Posicion')
const torneoRutas = require('./Rutas/Torneo')
const torneoEquipoRutas = require('./Rutas/TorneoEquipos')
const app = express()

app.use(express.json())
app.use(cors())
app.use(fileupload())
app.use(express.static('public'))

app.use('/jugador',jugadorRuta)
app.use('/equipo', equipoRuta)
app.use('/estadio',estadiosRuta)
app.use('/partido',partidosRutas)
app.use('/posicion',posicionRutas)
app.use('/torneo',torneoRutas)
app.use('/torneoEquipo',torneoEquipoRutas)

app.listen(8000,()=>{
    console.log('Servidor Funcionando...')
})