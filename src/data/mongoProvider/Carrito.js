const ProductoDTO = require('../../DTO/Producto');
const CarritoDTO = require('../../DTO/Carrito');
const IBase = require('../base/ICrudBase')
const connection = require('../config/Connection');
const mongoose = require('mongoose');
const Model = require('./model/Carritos');
const {ObjectId} = require('mongodb');
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
    async confirmCarrito(data){
        try{
            let _id = new ObjectId(data.id);
            await Model.updateOne({
                                        _id: _id,
                                        finalizado:0
                                    },
                                    {
                                        finalizado:1
                                    });
            return;
        }
        catch(err)
        {
            throw Error(`Error actualizando carrito ${err.message}`);
        }
    }
    async save(data){
        try{    
            let carrito = await this.getById(data.username);              
            if(carrito.id == ""){                
                Model.create(data);
            }           
            else
            {
                await Model.updateOne({username:data.username},
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
            let _id = ObjectId(data.id_producto);
            
            let result = await Model.update({username:data.id, $pull: {productos:{id:_id}}});
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
                items = await Model.findOne({});    
            }else{
                items = await Model.findOne({username: id, finalizado: 0});
            }
            let carrito = {};
            if (items != null){
                carrito = new CarritoDTO(items._id, new Date(),new Array(), id);
                for(let index = 0; index < items.productos.length; index++){
                    let producto = new ProductoDTO(items.productos[index].id,
                        items.productos[index].timestamp,
                        items.productos[index].nombre,
                        items.productos[index].descripcion,
                        items.productos[index].codigo,
                        items.productos[index].foto,
                        items.productos[index].precio,
                        items.productos[index].stock);
                    carrito.productos.push(producto);
                }
            }
            else{
                carrito = new CarritoDTO("", new Date(),new Array(), id);
            }
            
            return carrito;
        }
        catch(err){
            throw new Error(`Error al recuperar el carrito [${id}]: ${err.message}`);
        }
    }
}

module.exports = Carrito;