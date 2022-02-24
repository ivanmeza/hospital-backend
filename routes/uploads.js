const { Router } = require('express');//importo express
const expressFileUpload = require('express-fileupload');//importo el fileupload para la subida de archivos


const { validarJWT } = require('../middlewares/validar-jwt');//importo mi middlewares para validar token
const { filUpload, retornaImagen } = require('../Controllers/uploads');//importo mi controlador 

const router = Router();//creo la ruta 
router.use(expressFileUpload());//uso el expressFileUpload




router.put('/:tipo/:id',validarJWT,filUpload);//creo mi ruta put con tipo hospitales,medicos o usuarios y su id
router.get('/:tipo/:foto',retornaImagen);
module.exports = router;//exporto mi modulo para que se pueda usarse fuera