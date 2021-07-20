const ProductoModel = require('../../model/ProductoModel');
const CarritoModel = require('../../model/CarritoModel');
const IBase = require('../base/ICrudBase')
const connection = require('../config/Connection');
const mongoose = require('mongoose');
const Model = require('./model/Carritos');

class Carrito extends IBase{
    constructor(){
        super();
        mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=> {
                console.log('Conexion exitosa');
            });
    }
    async getLastId(){
        let last = await Model.find({}).sort({id:"desc"}).limit(1);
        let lastId = 1;
        if(last.length > 0){
            lastId = last[0].id + 1 
        }

        return lastId;
    }
    async save(data){
        try{                        
            if(data.id == null){
                data.id = await this.getLastId();
                Model.create(data);
            }           
            else
            {
                await Model.updateOne({id:data.id},
                        {
                            $push:{
                                productos: data.productos[0]
                            }
                        }

                    ); 
            }
            
            return true;
        }
        catch(err){
            throw new Error(`Error al insertar: ${err.message}`);
        }
        
    }
    async delete(data){
        try{
                                    
            let result = await Model.update({id:data.id, $pull: {productos:{id:data.id_producto}}});
            console.log(result);
        }
        catch(err){
            throw new Error(`Error al eliminar el producto: ${err.message}`);
        }
    }    
    async getById(id){
        try{
            let items;
            if (id == undefined){
                items = await Model.find({});    
            }else{
                items = await Model.find({id: id});
            }
            
            
            return items;
        }
        catch(err){
            throw new Error(`Error al recuperar el carrito [${id}]: ${err.message}`);
        }
    }
}

module.exports = Carrito;