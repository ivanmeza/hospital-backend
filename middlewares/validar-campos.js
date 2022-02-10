const { response } = require('express');//importo express
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next )=>{

    const errores = validationResult(req);//paso mi requerimiento o lo que mando de postman o lo que recobo del front por el validador 
    if(!errores.isEmpty()){//si mi validacion no esta vacia hay errores 
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()//imprimo el error de validacion
        });
    }
    next();
}

module.exports = {
    validarCampos
}