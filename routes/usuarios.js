
// // ruta      /api/usuarios
const { Router } = require('express');//importo express
const { check } = require('express-validator');//importo la libreria para validar de express
const { validarCampos } = require('../middlewares/validar-campos');//importo mis validaciones 

const { getUsuarios,CrearUsuarios,actualizarUsuario,borrarUsuario } = require('../Controllers/usuarios');//importo el controlador 
const { validarJWT } = require('../middlewares/validar-jwt');//importo

const router = Router();//creo la ruta que hace el get

router.get('/',validarJWT,getUsuarios);//mediante el router obtengo el getUsuarios a mi controlador

router.post('/',//mediante el check y el nombre de mi campo a validar fijo mis validaciones
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    CrearUsuarios
);
router.put( '/:id',
    [
        validarJWT,
        check('nombre','el nombre es obligatorio').not().isEmpty(),//no vacio validacion y mensaje que se manda
        check('email','el email es obligatorio').isEmail(),//debe ser email
        check('role','el rol es obligatorio').not().isEmpty(),//debe ser email
        validarCampos
    ],
    actualizarUsuario
);
router.delete( '/:id',
    validarJWT,
    borrarUsuario
);
module.exports = router;//exporto el modulo  para poder usarlo fuera