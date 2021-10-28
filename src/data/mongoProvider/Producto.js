const DTO = require('../../DTO/Producto');
const IBase = require('../base/ICrudBase')
const connection = require('../config/Connection');
const mongoose = require('mongoose');
const Model = require('./model/Productos');
const {ObjectId} = require('mongodb');

class Producto extends IBase{
    constructor(){
        super();
        mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=> {
                console.log('Conexion exitosa');
            })
            .catch(err => console.log(err));
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
            let _id = ObjectId(id);
            await Model.updateOne({_id:_id},
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
            let _id = ObjectId(id);
            await Model.deleteOne({_id: _id});            
        }
        catch(err){
            throw new Error(`Error al actualizar el producto: ${err.message}`);
        }
    }
    
    async getAll(){
        let lista = new Array();
        try{
            let productos = await Model.find({});            
            for(let index = 0; index < productos.length; index++){
                let prod = this.getDtoToData(productos[index]);
                lista.push(prod);
            }
            return lista;
        }
        catch(err){
            throw new Error(`Error al recuperar los productos: ${err.message}`);
        }   
    }

    async getById(id){
        try{
            let _id = ObjectId(id);
            let producto = await Model.findOne({_id: _id});            
            let item = this.getDtoToData(producto);
            return item;
        }
        catch(err){
            throw new Error(`Error al recuperar el producto [${id}]: ${err.message}`);
        }
    }
    getDtoToData(data){
        let dto = new DTO(data._id, data.timestamp, 
                            data.nombre, data.descripcion, data.codigo, data.foto, data.precio,
                            data.stock);
        return dto;
    }
    
}

module.exports = Producto;