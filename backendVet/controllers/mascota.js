'use strict'

let validator = require('validator')
let Mascota = require('../models/mascota') 

var controller = {

    //ruta de prueba 
    datosMascota: (req,res) =>{
        var hola = req.body.hola

        return res.status(200).send({ 
            vetirnaria:'Vida Silvestre',
            medico:'Federic',
            url:'vvs.com.uy',
            hola
        });
    },

    test: (req,res) =>  {
        return res.status(200).send({
            message: 'I´m the test action of my pet controller'

        });
    },

    save: (req, res) => {
        //recoger parámetros
        var params = req.body
        
        //Validar datos 
        try{
            var validatedname = !validator.isEmpty(params.nombre);
            var validatedtype = !validator.isEmpty(params.tipo);
            var validatedDateofBirth = !validator.isEmpty(params.fechaDeNacimiento)
            var validatedWeight = !validator.isEmpty(params.peso)
            var validatedVaccines = !validator.isEmpty(params.vacunas)
            var validatedOwnerName = !validator.isEmpty(params.nombreDueno);
            var validatedOwnerCi = !validator.isEmpty(params.ciDueno)
            var validatedOwnerTel = !validator.isEmpty(params.telefonoDueno);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'mising info' 
            });
        }

        if(validatedname && validatedtype &&validatedDateofBirth &&validatedWeight && validatedOwnerName && validatedOwnerTel){
            //crear objeto a guardar
            var mascota = new Mascota();
            //asignar valores
            mascota.nombre = params.nombre
            mascota.tipo = params.tipo
            mascota.fechaDeNacimiento = params.fechaDeNacimiento
            mascota.peso = params.peso
            mascota.vacunas = params.vacunas
            mascota.nombreDueno = params.nombreDueno
            mascota.ciDueno = params.ciDueno
            mascota.telefonoDueno = params.telefonoDueno

            //guardar el objeto 
            mascota.save((err, mascotasaved) => {

                if(err || !mascotasaved ) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'error al guardar mascota'
                    });
                }

                 //respuesta
                return res.status(200).send({
                    status: 'success',
                    mascota: mascota
                
                });

            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos' 
            });
        }
    },

    getMascotas: (req, res) => {

        var query = Mascota.find({});

        var last = req.params.last;
        if(last || last != undefined){
            query.limit(2);
        }

        //find
        query.sort('-_id',).exec((err, mascotas) =>{

            if (err){
                return res.status(500).send({ 
                    status: 'error',
                    message:'error al obtener las mascotas'
                }); 
            }

            if (!mascotas){
                return res.status(404).send({ 
                    status: 'error',
                    message:'No hay mascotas'
                }); 
            }
            
            return res.status(200).send({ 
                status: 'success',
                mascotas
            });

        });     
    },

    getMascota: (req, res) => {
        //recoger id de la url
        var mascotaId = req.params.id;

        //comprobar que existe
        if (!mascotaId || mascotaId == null){
            return res.status(404).send({
                satus: 'error',
                message: 'No existe la mascota'
            });
        }

        //Buscar el artículo
        
        Mascota.findById(mascotaId, (err, mascota) =>{
            if(err|| !mascota){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la mascota'
                });
            }    
            
            //Devolverlo en Json
            return res.status(200).send({
                status : 'succes',
                mascota
            });
        });
    },

    update: (req,res) => {
        //recoger el id de la mascota por la url
        var mascotaId = req.params.id

        //recoger los datos que llegan por put
        var params = req.body

        //validar los datos
        try{
            var validatedname = !validator.isEmpty(params.nombre);
            var validatedtype = !validator.isEmpty(params.tipo);
            var validatedDateofBirth = !validator.isEmpty(params.fechaDeNacimiento)
            var validatedWeight = !validator.isEmpty(params.peso)
            var validatedVaccines = !validator.isEmpty(params.vacunas)
            var validatedOwnerName = !validator.isEmpty(params.nombreDueno);
            var validatedOwnerCi = !validator.isEmpty(params.ciDueno)
            var validatedOwnerTel = !validator.isEmpty(params.telefonoDueno)

        }catch(err) {
            return res.status(404).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }
        if (validatedname && validatedtype &&validatedDateofBirth &&validatedWeight &&validatedVaccines && validatedOwnerName && validatedOwnerCi && validatedOwnerTel){
            //find and update
            Mascota.findOneAndUpdate({_id: mascotaId}, params, {new: true}, (err, mascotaUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al actualizar'
                    });
                }
                if(!mascotaUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe la mascota'
                    });
                }
                //respuesta
                return res.status(200).send({
                    status: 'succes',
                    mascotaUpdated
                });
                

            });
        } else{
            // Devolver respuesta
           return res.status(200).send({
               status: 'error',
               message: 'La validación no es correcta !!!'
           });
       } 
        
    },

    delete: (req, res) => {
        //recoger el id de la mascota por url
        let mascotaId = req.params.id

        //delete
        Mascota.findByIdAndDelete({_id: mascotaId}, (err, mascotaDeleted) =>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar mascota !'
                });
            }
            if(!mascotaDeleted){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay mascota para eliminar!'
                });
            }
            
            return res.status(200).send({
                status: 'succes',
                mascotaDeleted                
            });
        })
       
    },

    search: (req, res) => {
        //sacar el string a busar
        let searchString = req.params.search

        //find or
        Mascota.find({"$or":[ 
            {"nombre": {"$regex": searchString, "$options": "i"}},
            {"nombreDueno": {"$regex": searchString, "$options": "i"}} //cuando el titulo coresponda a una regex
        ]}).sort([['nombre', 'descending']])
        .exec((err, mascotas) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener la búsqueda'
                });
            }
            if(!mascotas || mascotas.length <=0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay mascotas que coincidan con la búsqueda'
                });
            }
            return res.status(200).send({
                status: 'succes',
                mascotas
            });
        });

       

    }


};  

module.exports = controller; 

