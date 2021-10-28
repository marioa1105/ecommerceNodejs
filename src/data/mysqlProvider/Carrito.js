const DTO = require('../../DTO/Carrito');
const Producto = require('./Producto');
const IBase = require('../base/ICrudBase')
const connection = require('../config/Connection');
const knex = require('knex')(connection);

class Carrito extends IBase{
    constructor(){
        super();
        knex.schema.hasTable('carritos').then(existsTable =>{
            if (!existsTable){
                knex.schema.createTable('carritos', function(table) {
                    table.integer('id').unsigned();
                    table.datetime('timestamp');
                    table.primary(['id','id_producto'],'PK_carritos');
                    table.integer('id_producto',10).unsigned().notNullable().references('id').inTable('productos'); 
                    
                }).then(() => {
                    console.log('tabla carritos creada!');
                }).catch(error => {
                    console.log('error:', error);
                    throw error;
                }).finally(() => {                    
                });
            } 
        });
    }
    async getLastId(){
        let last = await knex("carritos").max('id as maxId').first();
        let lastId = 1;
        if(last.maxId != null){
            lastId = last.maxId + 1 
        }

        return lastId;
    }
    async save(data){
        try{
            if(data.id == undefined){
                data.id = await this.getLastId();
            }
            for (let index = 0; index < data.productos.length; index++) {
                let element = {
                    id : data.id,
                    timestamp: data.timestamp,
                    id_producto: data.productos[index].id 
                };
                await knex('carritos').insert(element);
                
            }             
            return true;
        }
        catch(err){
            throw new Error(`Error al insertar: ${err.message}`);
        }
        
    }
    async update(data,id){
        return true;
    }
    async delete(data){
        try{
            await knex('carritos').where({'id':data.id, 'id_producto':data.id_producto}).del();
        }
        catch(err){
            throw new Error(`Error al eliminar el producto: ${err.message}`);
        }
    }    

    async getAll(){
        return true; 
    }

    async getById(id){
        try{
            let row;
            if (id == undefined){
                row  = await knex('carritos').select('*').orderBy('id','asc');
            }
            else{
                row  = await knex('carritos').where('id', id);
            }
            
            let carritoDto = new DTO(-1, new Date(),new  Array(), "");
            let carritos = new Array();
            let ProductoData = new Producto();
            //carritoDto.id = -1;
            
            for (let r of row) {     
                if(carritoDto.id != r['id']){
                    if(carritoDto.id != -1){
                        carritos.push(carritoDto);
                        carritoDto = new DTO();
                    }
                    carritoDto.id = r['id'];
                    carritoDto.timestamp = r['timestamp']
                }
                let item = await ProductoData.getById(r['id_producto']);
                carritoDto.productos.push(item);
            }
            carritos.push(carritoDto);
            return carritos;
        }
        catch(err){
            throw new Error(`Error al recuperar el carrito [${id}]: ${err.message}`);
        }
    }
    
}

module.exports = Carrito;