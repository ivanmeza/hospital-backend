
const jwt = require('jsonwebtoken');//importo mi jwt
const validarJWT = (req, res, next)=>{

    //leer el token de los headers postman
    const token  = req.header('x-token');

    if(!token){//si no hay token
        return res.status(401).json({
            ok: false,
            msg: 'no hay token'
        });
    }

    try {
        const { uid } = jwt.verify(token,process.env.JWT_SECRET);//token del postman y la firma en mis variables de entorno
        req.uid = uid;//almaceno el id en mi req.uid para poder usarlo despues
        next();//si todo sale bien
    } catch (error) {//si hay un error
        res.status(401).json({
            ok: false,
            msg:'token incorrecto'
        });
    }
   
}

module.exports = {validarJWT}