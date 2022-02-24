const {response} = require('express');//para autocompletar res.status
const Hospital = require('../Models/hospital');//importo mi modelo de hospital

const getHospitales = async (req, res = response )=>{
    const hospitales = await Hospital.find().populate('usuario', 'nombre email img');

    res.json({
        ok: true,
        hospitales
        
    });
}

const crearHospital = async (req, res = response )=>{

    const uid = req.uid;//obtengo el id 
    //alamcenamos lo que tenemos en body en el objeto hospital
    const hospital = new Hospital({
        usuario : uid,//le mando a mi propiedad usuario el id que obtuve del token
        ...req.body //desesctruroel resto de capos 
    });
    
    try {
      
        const hospitalDB = await hospital.save();//guard los datos que ya trea el objeto hospital

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'error de administracion'
        });
    }

}
const actualizarHospital = (req, res = response )=>{
    res.json({
        ok: true,
        msg: 'actualizar hospitales'
    });
}
const borrarHospital = (req, res = response )=>{
    res.json({
        ok: true,
        msg: 'borrar hospitales'
    });
}
module.exports = {getHospitales,crearHospital,actualizarHospital,borrarHospital}//esporto los metodos para usuarse en mis rutas