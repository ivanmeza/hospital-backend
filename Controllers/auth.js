
const { response } = require('express');//importo express
const bcrypt = require('bcryptjs');//importo la libreria para encriptar contraseñas o leerlas
const Usuario = require('../Models/usuario');//importo mi modelo donde declare mis propiedades
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response)=>{

    const {email, password} = req.body;//obtengo de postman el email y el password
    try {

        const usuarioDB = await Usuario.findOne({email});//busco el email desde mi modelo
        //verificar email
        if(!usuarioDB){//si no esta registrado
            return res.status(404).json({
                ok: false,
                msg:'email no encontrado'
            });
        }
        //verificar contraseñas
        const validpassword = bcrypt.compareSync(password,usuarioDB.password);//comparo el password de postman con el que tengo almacenado
        if(!validpassword){//si la contraseña de postman no es correcta 
            return res.status(404).json({
                ok: false,
                msg:'password no valida'
            });
        }

        //genero un token si las credenciales son correctas

        const token = await generarJWT(usuarioDB.id);//mando el id de mi bd a mi funcion generarJWT

        res.json({
            ok: true,
            token//regreso el token 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'error'
        });
    }
}

module.exports = {login}