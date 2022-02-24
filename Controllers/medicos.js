const {response} = require('express');//para autocompletar res.status
const Medico = require('../Models/medicos');//importo mi modelo de medicos
const getMedicos = async (req, res = response )=>{
    const medicos = await Medico.find().populate('usuario','nombre img')
                                        .populate('hospital','nombre');
    res.json({
        ok: true,
        medicos
    });
}

const crearMedicos = async (req, res = response )=>{
    const uid = req.uid;//obtengo el id del usuario mediante el token

    const medico = new Medico({
        usuario : uid,//le mando a mi propiedad usuario el id que obtuve del token
        ...req.body //desesctruroel resto de capos 
    });
    try {
        const medicoDB = await medico.save();//guardo los datos que ya trea el objeto medico y los paso a una constante medicoDB

        res.json({
            ok: true,
            medico: medicoDB//uestro mis datos en la respuesta
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'error de administracion medico'
        });
    }

    res.json({
        ok: true,
        msg: 'crear medicos'
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
const actualizarMedicos = (req, res = response )=>{
    res.json({
        ok: true,
        msg: 'actualizar medicos'
    });
}
const borrarMedicos = (req, res = response )=>{
    res.json({
        ok: true,
        msg: 'borrar medicos'
    });
}
module.exports = {getMedicos,crearMedicos,actualizarMedicos,borrarMedicos}//esporto los metodos para usuarse en mis rutas