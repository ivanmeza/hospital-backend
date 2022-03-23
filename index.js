require('dotenv').config();//leo las variables de entorno
const express = require('express');

var cors = require('cors');//importo los cors
const { dbConnection } = require('./database/config');//jalo mi conexion a la base de datos
//password    dm8hVzxBTGRBHxWD

// Crear el servidor de express
const app = express();

//cors
app.use(cors());

dbConnection();//ejecuto mi conexion a db
app.get('/', (req, res) => {
 res.json({ 
     ok: true,
     msg: 'dfgdgfdg'
 })
});

app.listen(process.env.PORT, ()=>{
    console.log('puerto' + 3000);
});