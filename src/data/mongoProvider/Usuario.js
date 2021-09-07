
const IBase = require('../base/ICrudBase')
const connection = require('../config/Connection');
const mongoose = require('mongoose');
const Model = require('./model/Usuarios');

class Usuario extends IBase{
    constructor(){
        super();
        mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=> {
                console.log('Conexion exitosa');
            });
    }
    
    async save(data){
        try{                  
            await Model.create(data);            
            return true;
        }
        catch(err){
            throw new Error(`Error al insertar: ${err.message}`);
        }
    }
    
    async getById(id){
        try{            
            let producto = await Model.find({email: id});            
            return producto[0];
        }
        catch(err){
            throw new Error(`Error al recuperar usuario [${id}]: ${err.message}`);
        }
    }
    
}

module.exports = Usuario;