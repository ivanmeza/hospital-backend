const fs = require('fs');
//importo mis modelos
const Usuario = require('../Models/usuario');
const Medico = require('../Models/medicos');
const Hospital = require('../Models/hospital');

const borrarImagen =(path)=>{
   
    if(fs.existsSync(path)){//si existe una imagen en el path
        fs.unlinkSync(path);//elimino la imagen vieja del path o url
    }

}

const actualizarImagen = async (tipo,id,nombreArchivo)=>{//recibo el tipo, el id y el nombre del archivo a actualizar
    let pathViejo ='';
    switch(tipo){
        case 'medicos':
            const medico = await Medico.findById(id);//busco en mi modelo el id que me mandan
            if(!medico){//si no existe el medico
                console.log("no se encontro medico con este id");
                return false;
            }
            //si llega a este paso es que si existe
             pathViejo = `./uploads/medicos/${medico.img}`;//obtengo el pat o imagen vieja accediendo al modelo medico y su propiedad img
            borrarImagen(pathViejo);//mando llamar mi metodo para actualizar 

            medico.img = nombreArchivo;//almacenjo la nueva imagen en el path
            await medico.save();
            return true;// regreso un true si lo hace correctamente

        break;
        case 'hospitales':
             hospital = await Hospital.findById(id);//busco en mi modelo el id que me mandan
            if(!hospital){//si no existe el medico
                console.log("no se encontro hospital con este id");
                return false;
            }
            //si llega a este paso es que si existe
             pathViejo = `./uploads/hospitales/${hospital.img}`;//obtengo el pat o imagen vieja accediendo al modelo medico y su propiedad img
            borrarImagen(pathViejo);//mando llamar mi metodo para actualizar 

            hospital.img = nombreArchivo;//almacenjo la nueva imagen en el path
            await hospital.save();
            return true;// regreso un true si lo hace correctamente
        break;
        case 'usuarios':
            const usuarios = await Usuario.findById(id);//busco en mi modelo el id que me mandan
            if(!usuarios){//si no existe el medico
                console.log("no se encontro usuarios con este id");
                return false;
            }
            //si llega a este paso es que si existe
             pathViejo = `./uploads/usuarios/${usuarios.img}`;//obtengo el pat o imagen vieja accediendo al modelo medico y su propiedad img
            borrarImagen(pathViejo);//mando llamar mi metodo para actualizar 

            usuarios.img = nombreArchivo;//almacenjo la nueva imagen en el path
            await usuarios.save();
            return true;// regreso un true si lo hace correctamente
        break;
    }

}


module.exports ={actualizarImagen}