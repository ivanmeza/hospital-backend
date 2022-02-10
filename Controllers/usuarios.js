
const { response } = require('express');//importo express
// const { validator } = require('express-validator');
const Usuario = require('../Models/usuario');//importo mi modelo para acceder a sus propiedades
const { generarJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');//libreria para encriptar contraseñas
const res = require('express/lib/response');
// //aqui va la logica o lo que regreso de la bd
const getUsuarios = async (req,res)=>{//funcion requirimiento al servidor y respuesta  que regresa datos
    const usuarios = await  Usuario.find({}, 'nombre email role google');//obtengo de mi bd el nombre,email,role y google
    res.json({
        ok:true,
        usuarios,//imprimo la respuesta 
        uid: req.uid
    });
}


const CrearUsuarios = async (req,res = response)=>{//funcion requirimiento al servidor y respuesta  que regresa datos

    //extraego lo que manda el front o en este caso lo que mando del postman
    const {email,password} = req.body;
 

    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'ya existe este correo'
            });
        }
        ////////////////////////
        const usuario = new Usuario(req.body);//creo un objeto de mi modelo para poder mandar sus propiedades a mongo

        //encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        //guardo usuario
        await usuario.save();//almaceno lo que extraje de postan o front en mi base de datoscon el await espero a que termine este proceso si o si y despues sigo con el de abajo
        //generar token jwt
        const token = await generarJWT(usuario.id);//mando el id de mi bd a mi funcion generarJWT
         res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error... revisar logs'
        });
    }

   
}


const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;//obtengo el id de postman


    try {

        const usuarioDB = await Usuario.findById( uid );//busco en mi modelo al usuario con ese id

        if ( !usuarioDB ) {//si no esta en mi modelo mando mensaje que no existe ese usuario 
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        //si si existe voy a editar
        
        const { password, google, email, ...campos } = req.body;//obtengo los datos de postman req.body y los almaceno en mi varioable campos
        //menos password,google y email

        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });//busco el email que mando postaman en mi modelo
            if ( existeEmail ) {//si lo encuentra
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        campos.email = email;
        //mediante el modelo paso el id y los campos que actualizare
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarUsuario = async(req,res = response)=>{
    const uid = req.params.id;
   try {
    const usuariodb = await Usuario.findById(uid);//busco un usuario con el uid 

    if(!usuariodb){//si no existe el usuario con el uid 
        return res.status(404).json({
            ok:false,
            msg:'no existe el usuario'
        });
    }

    await Usuario.findByIdAndDelete(uid);
       res.json({
           ok:true,
           msg: 'usuario eliminado'
       })
   } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'error delete'
        });
   }
}
module.exports = {getUsuarios,CrearUsuarios,actualizarUsuario,borrarUsuario} //exporto el modulo para poder usarlo fuera