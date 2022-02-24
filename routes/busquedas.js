const { Router } = require('express');//importo express
const router = Router();//creo la ruta que hace el get


const { getTodo,getDocumentosColeccion } = require('../Controllers/busquedas');//importo mi controlador

const { validarJWT } = require('../middlewares/validar-jwt');//importo mi middlewares para validar token
router.get('/:busqueda',validarJWT,getTodo);//creo mi ruta get
router.get('/coleccion/:tabla/:busqueda',validarJWT,getDocumentosColeccion);
module.exports = router;//exporto mi modulo para que se pueda usarse fuera