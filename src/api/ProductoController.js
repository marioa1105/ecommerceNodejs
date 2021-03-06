const ProductoData = require('../data/factory/FactoryDAO')('Producto');//require('../Data/factory/ProductoFactory');
const Model = require('../DTO/Producto');

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
        let productos = items.map(x => {
            return {
                id: x.id,
                nombre: x.nombre,
                descripcion: x.descripcion,
                precio: x.precio,
                stock: x.stock,
                foto: x.foto
            };
        })
        
        return productos;
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