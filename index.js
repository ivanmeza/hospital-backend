require('dotenv').config();//importo mi archivo env o variables de entorno
const express = require('express');//importo express
const cors = require('cors');//importo mis cors

const {dbConnection} = require('./Database/config');// importo mi conexion a mongo que esta en Database

const app = express();//creo el servidor de express

//configuracion de cors
app.use(cors());

//lectura y parseo del body recibo del pastman o front 
app.use(express.json());


//base de datos 
dbConnection();//ejecuto mi conexion a mongo


//rutas                 //controlador
app.use('/api/usuarios',require('./routes/usuarios'));//concatamos toda la ruta desde el controlador
app.use('/api/hospitales',require('./routes/hospitales'));//concateno toda la ruta desde el controlador
app.use('/api/medicos',require('./routes/medicos'));//concateno toda la ruta desde el controlador
app.use('/api/todo',require('./routes/busquedas'));//creo la ruta concatenando el controlador
app.use('/api/login',require('./routes/auth'));
app.use('/api/upload',require('./routes/uploads'));

//mediante las variables de entonro process.env
app.listen(process.env.PORT,()=>{
    console.log('corriendo el servidor' + ' ' + process.env.PORT);
});








