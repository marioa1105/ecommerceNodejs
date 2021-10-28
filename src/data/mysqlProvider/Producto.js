const DTO = require('../../DTO/Producto');
const IBase = require('../base/ICrudBase')
const connection = require('../config/Connection');
const knex = require('knex')(connection);

class Producto extends IBase{
    constructor(){
        super();
        knex.schema.hasTable('productos').then(existsTable =>{
            if (!existsTable){
                knex.schema.createTable('productos', function(table) {
                    table.increments('id').primary();
                    table.datetime('timestamp');
                    table.string('nombre',150).notNullable();
                    table.text('descripcion');
                    table.integer('codigo');
                    table.string('foto',500);
                    table.float('precio');
                    table.integer('stock');
                }).then(() => {
                    console.log('tabla productos creada!');
                }).catch(error => {
                    console.log('error:', error);
                    throw error;
                }).finally(() => {                    
                });
            } 
        });
    }
    async save(data){
        try{
            let result = await knex('productos').insert(data).returning('id');
            data.id = result[0];
            return true;
        }
        catch(err){
            throw new Error(`Error al insertar: ${err.message}`);
        }
        
    }
    async update(data,id){
        try{
            await knex('productos').where('id',id).update({
                nombre: data.nombre,
                descripcion: data.descripcion,
                foto: data.foto,
                precio: data.precio,
                stock:data.stock,
                codigo:data.codigo
            });
        }
        catch(err){
            throw new Error(`Error al actualizar el producto: ${err.message}`);
        }
    }
    async delete(id){
        try{
            await knex('productos').where('id',id).del();
        }
        catch(err){
            throw new Error(`Error al eliminar el producto: ${err.message}`);
        }
    }
    async getObjectByRow(row){
        let producto = new DTO(row['id'],
        row['timestamp'],row['nombre'],row['descripcion'],row['codigo'],row['foto'],row['precio'],row['stock']);
        
        return producto;
    }

    async getAll(){
        let lista = new Array();
        try{
            let rows = await knex('productos').select('*');            
            for (let row of rows) {     
                let item = await this.getObjectByRow(row)           
                lista.push(item);
            }
            return lista;
        }
        catch(err){
            throw new Error(`Error al recuperar los productos: ${err.message}`);
        }   
    }

    async getById(id){
        try{
            let row  = await knex('productos').where('id', id);
            let producto = this.getObjectByRow(row[0]);
            return producto;
        }
        catch(err){
            throw new Error(`Error al recuperar el producto [${id}]: ${err.message}`);
        }
    }
    
}

module.exports = Producto;