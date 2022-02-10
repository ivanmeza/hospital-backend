const { Router } = require('express');//importo express
const { login } = require('../Controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/',
    [
        check('email','el email es obligatorio').isEmail(),
        check('password','el password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

module.exports = router;