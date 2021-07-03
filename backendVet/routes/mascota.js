'use strict'

let express = require('express')

var mascotaController = require('../controllers/mascota')

let router = express.Router();

//rutas prueba
router.post('/datos-mascota', mascotaController.datosMascota);
router.get('/test-controlador', mascotaController.test);
//rutas útiles
router.post('/guardar-mascota', mascotaController.save);
router.get('/mascotas/:last?', mascotaController.getMascotas);
router.get('/mascota/:id', mascotaController.getMascota);
router.put('/mascota/:id', mascotaController.update);
router.delete('/mascota/:id', mascotaController.delete);
router.get('/mascota/search/:search', mascotaController.search)


module.exports = router;

