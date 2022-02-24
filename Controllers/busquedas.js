const {response} = require('express');//para obtener el tipado

const Usuario = require('../Models/usuario');
const Medico = require('../Models/medicos');
const Hospital = require('../Models/hospital');

const getTodo = async(req,res, response)=>{
    const busqueda = req.params.busqueda;//obtengo el dato que viene en la url 
    const regex = new RegExp(busqueda,'i');//hago la busqueda insensible pasandolo por un regex

   

    const [usuarios,medicos,hospitales] = await Promise.all([
         Usuario.find({ nombre:regex }),
         Medico.find({ nombre:regex }),
         Hospital.find({ nombre:regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentosColeccion = async(req,res, response)=>{
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;//obtengo el dato que viene en la url 
    const regex = new RegExp(busqueda,'i');//hago la busqueda insensible pasandolo por un regex

    let data = [];
    switch(tabla) {
        case 'medicos':
            data = await Medico.find({ nombre:regex })
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre:regex })
                                .populate('usuario','nombre img');
        break;
        case 'usuarios':
           data = await Usuario.find({ nombre:regex });
         
        break;
        default:
           return res.status(400).json({
                 ok: false,
                 msg: 'error'
             });

           
    }
   

    res.json({
        ok: true,
        resultados: data
    })
}
module.exports = { getTodo, getDocumentosColeccion }