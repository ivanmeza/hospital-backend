
// // ruta      /api/usuarios
const { Router } = require('express');//importo express
const { check } = require('express-validator');//importo la libreria para validar de express
const { validarCampos } = require('../middlewares/validar-campos');//importo mis validaciones 


const { validarJWT } = require('../middlewares/validar-jwt');//importo

const {getMedicos,crearMedicos,actualizarMedicos,borrarMedicos} = require('../Controllers/medicos');//importo mis metodos del controlador
const router = Router();//creo la ruta que hace el get

router.get('/',getMedicos);//mediante el router obtengo el getUsuarios a mi controlador 

router.post('/',//mediante el check y el nombre de mi campo a validar fijo mis validaciones
    [
        validarJWT,
        check('nombre','el nombre del medico es obligatorio').not().isEmpty(),
        check('hospital','el hospital debe tener un id valido').isMongoId(),
        validarCampos
    ],
    crearMedicos
);
router.put( '/:id',
    [],
    actualizarMedicos
);
router.delete( '/:id',
    borrarMedicos
);
module.exports = router;//exporto el modulo  para poder usarlo fuera