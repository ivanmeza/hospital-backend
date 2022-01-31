const express = require('express');//importo express
require('dotenv').config();//importo mi archivo env o variables de entorno
var cors = require('cors');//importo mis cors
const {dbConnection} = require('./Database/config');// importo mi conexion a mongo que esta en Database
const app = express();//creo un objeto de express

//configuracion de cors
app.use(cors());
//base de datos 
dbConnection();//ejecuto mi conexion a mongo

console.log(process.env.PORT);//trae el dato del puerto donde esta corriendo el servidor

//rutas
app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg: 'hola mundo'
    });
});

app.listen(process.env.PORT,()=>{//mediante el objeto ejecuto el servidor
    console.log('corriendo el servidor' + ' ' + process.env.PORT);
})