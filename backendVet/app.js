'use strict';
if (process.env.NODE_ENV === "development") {
    require('dotenv').config({path:'.env'});
}

//cargar modulos de node para crear un servidor
var express = require('express');
const cors = require('cors');
console.log()

//ejecutar express http
var app = express();

//Middleares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Cors permitir peticiones desde el front-end
app.use(cors());

//Requerir rutas y añadirles un prefijo (lo último buena práctica)
app.use('/api/mascota' , require('./routes/mascota'))

//Exportar modulo actual 
module.exports = app;

