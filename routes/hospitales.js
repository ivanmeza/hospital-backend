
// // ruta      /api/usuarios
const { Router } = require('express');//importo express
const { check } = require('express-validator');//importo la libreria para validar de express
const { validarCampos } = require('../middlewares/validar-campos');//importo mis validaciones 


const { validarJWT } = require('../middlewares/validar-jwt');//importo

const {getHospitales,crearHospital,actualizarHospital,borrarHospital} = require('../Controllers/hospitales');//importo mis metodos del controlador
const router = Router();//creo la ruta que hace el get

router.get('/',getHospitales);//mediante el router obtengo el getUsuarios a mi controlador 

router.post('/',//mediante el check y el nombre de mi campo a validar fijo mis validaciones
    [
        validarJWT,
        check('nombre','el nombre de hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);
router.put( '/:id',
    [],
    actualizarHospital
);
router.delete( '/:id',
    borrarHospital
);
module.exports = router;//exporto el modulo  para poder usarlo fuera