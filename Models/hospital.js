const { Schema, model} = require('mongoose');//importo mongoose

const HospitalSchema = Schema({//creo mi schema o las propiedades que tendra la tabla usuario (modelo)
//propiedades 
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }
},{ collection:'hospitales' });//cambio el nombre en mongo a hospitales

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();//extraego la version para que no se muestre
  
    return object;
})
module.exports = model('Hospital',HospitalSchema);//exporto este eschema con el nombre de Hospital por defecto mongoose pone el plural (s)