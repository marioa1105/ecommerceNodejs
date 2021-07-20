const ProductoData = require('../Data/factory/ProductoFactory');
const Model = require('../model/ProductoModel');

class Producto{     
    constructor(){        
        this.data = new ProductoData();
    } 
    
    async saveProducto(item){    
                 
        await this.data.save(item);
        return item;
    }
    async getProductos(){
        let items = new Array();
        items =  await this.data.getAll();
        if (items.length == 0){
            throw new Error("No hay productos cargados");
        }
        return items;
    }
    async getProductoById(id){
        let item = await this.data.getById(id);
        
        if(item == null || item == undefined){
            throw new Error("Producto no encontrado");            
        }
        return item;
    }
    async updateProducto(prod, id){
        try{
            await this.data.update(prod,id);
            
            let items = await this.data.getAll();
            return items;
        }catch(error){
            throw error;
        }
    }
    async deleteProducto(id){
        try{
            
            await this.data.delete(id);
            let items = this.data.getAll();
            return items;
        }catch(error){
            throw error;
        }
    }
}

module.exports = Producto;