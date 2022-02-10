const mongoose = require('mongoose');//importo mongoose

const dbConnection = async ()=>{//creo mi conexion a mongo 
    try {
        //paso mi cadena de conexion a mongo mediante el archivo de la variables de entonrno process.env
        await mongoose.connect(process.env.DC_CONNECT,{
             useNewUrlParser: true,
             useUnifiedTopology: true,
            //  useCreateIndex: true,
         });
         console.log('bd Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports={//exporto mi conexion para usarla desde otro lugar
    dbConnection
}