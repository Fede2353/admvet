'use strict'


var mongoose = require('mongoose')

let Schema = mongoose.Schema;

let mascotaSchema = Schema({
    nombre: String,
    tipo: String,
    fechaDeNacimiento: Date,
    peso: Number, 
    vacunas: Date,
    nombreDueno: String,
    ciDueno: String,
    telefonoDueno: Number
});

module.exports = mongoose.model('Mascota', mascotaSchema);