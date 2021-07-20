const ProductoModel = require('../../model/ProductoModel');
const IBase = require('../base/ICrudBase')
const connection = require('../config/Connection');
const mongoose = require('mongoose');
const Model = require('./model/Productos');

class Producto extends IBase{
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
            data.id = await this.getLastId();                  
            await Model.create(data);            
            return true;
        }
        catch(err){
            throw new Error(`Error al insertar: ${err.message}`);
        }
    }
    async update(data,id){
        try{
            await Model.updateOne({id:id},
                                    {nombre: data.nombre,
                                        descripcion: data.descripcion,
                                        foto: data.foto,
                                        precio: data.precio,
                                        stock:data.stock,
                                        codigo:data.codigo});            
        }
        catch(err){
            throw new Error(`Error al actualizar el producto: ${err.message}`);
        }
    }
    async delete(id){
        try{
            await Model.deleteOne({id: id});            
        }
        catch(err){
            throw new Error(`Error al actualizar el producto: ${err.message}`);
        }
    }
    
    async getAll(){
        let lista = new Array();
        try{
            lista = await Model.find({});            
            return lista;
        }
        catch(err){
            throw new Error(`Error al recuperar los productos: ${err.message}`);
        }   
    }

    async getById(id){
        try{
            let producto = await Model.find({id: id});            
            return producto[0];
        }
        catch(err){
            throw new Error(`Error al recuperar el producto [${id}]: ${err.message}`);
        }
    }
    
}

module.exports = Producto;