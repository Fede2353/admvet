'use strict'

var mongoose = require('mongoose');
var app = require('./app');

app.set('port', process.env.PORT || '3900')

mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
    console.log('Conectado a la base de datos correctamente ')
    
    //Crear servidor y esuchar peticiones http
    app.listen(app.get('port'), () => {
        console.log('Server on port: ' + app.get('port'));    
    })
});
