const path = require('path');
const fs = require('fs');
const { response } = require('express');//para el tipaso
const { v4: uuidv4 } = require('uuid');//para ponerle nombre a mis archivos subidos
const { actualizarImagen } = require('../helpers/actualizar-imagen');//importo mi helper


const filUpload = (req,res = response)=>{

    //obtengo los parametros de l url tipo y id
    const tipo = req.params.tipo;
    const id = req.params.id;

    //tipo de archivos validos
    const tipoValidos =['hospitales','medicos','usuarios'];

    if(!tipoValidos.includes(tipo)){//si lo que traego de mi req postman no es de tipo valido
        return res.status(400).json({
            ok:false,
            msg:'error de tipo'
        });
    }
    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {//obtengo el archivo del postman 
        return res.status(400).json({
            ok:false,
            msg:'no se mando ningun archivo'
        });
    }
    //procesar la imagen
    const file = req.files.imagen;//obtengo la imagen de postman

    const nombreCorttado = file.name.split('.');//cortamos el archivo.name despues del punto ivan.jpg
    const extensionArchivo = nombreCorttado[nombreCorttado.length -1];//obtengo la extension del archivo


    //validar extension
    const extensionValida = ['png','jpg','jpeg','gif'];//extensiones validas de los archivos
    if(!extensionValida.includes(extensionArchivo)){//si la extensionArchivo es diferente a las validas
        return res.status(400).json({
            ok:false,
            msg:'no es una extension valida'
        });
    }

    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;//le doy nombre y una extension que posteriormente extraje del que subi

    //path para guardar la imagen
    const path  = `./uploads/${tipo}/${nombreArchivo}`;//guardo el archivo en la url que indique mediante el tipo y nombre del archivo


    //mover la imagen
    file.mv(path, (err)=> {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg:'error al mover la imagen'
            });
        }

        actualizarImagen(tipo,id,nombreArchivo);
    
         res.json({
            ok: true,
            msg:'archivo subido con exito',
            nombreArchivo
        });
    });
}


const retornaImagen = (req,res = response)=>{
    //obtengo el tipo y la foto del req postman
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);//junto la ruta con el tipo y la foto
    if(fs.existsSync(pathImg)){//si hay una imagen
        res.sendFile(pathImg);//la muestro en postman
    }else{//si no tiene una imagen 
        const pathImg = path.join(__dirname, `../uploads/notimage.png`);
        res.sendFile(pathImg);
    }
    
}

module.exports ={filUpload,retornaImagen}