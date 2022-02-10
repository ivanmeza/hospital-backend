const jwt = require('jsonwebtoken');//importo mi jwt

const generarJWT = (uid)=>{//funcion que recibe el id y  retorna una promesa 

    return new Promise((resolve, reject)=>{

        const payload = {//lo que vamos a graban en el token en este caso el id que recibo de mi modelo
            uid,
        };
    
        //firmamos el jwt mandando el payload la variable de entorno que trae la jwt secreta
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'12h'//expira el token en 12 hrs
        },(err,token)=>{//si hay error lo imprimo
            if(err){
                console.log(err);
                reject('error al generar jwt');
            }else{//si no hay error mando el token
                resolve(token);
            }
        });
    });
    
}
module.exports = {generarJWT}