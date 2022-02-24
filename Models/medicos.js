const { Schema, model} = require('mongoose');//importo mongoose

const MedicosSchema = Schema({//creo mi schema o las propiedades que tendra la tabla usuario (modelo)

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
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Hospital'
    }
});//cambio el nombre en mongo a hospitales

MedicosSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();//extraego la version para que no se muestre
  
    return object;
})
module.exports = model('Medico',MedicosSchema);//exporto este eschema con el nombre de Usuario por defecto mongoose pone el plural (s)