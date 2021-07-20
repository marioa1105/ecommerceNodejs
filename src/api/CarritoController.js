const ProductoModel = require("../model/ProductoModel");
const ProductoController = require('./ProductoController');
const CarritoData = require("../data/factory/CarritoFactory");
const CarritoModel = require("../model/CarritoModel");
class Carrito{
    constructor(){
        
        this.data = new CarritoData();
    }
    /*async createCarrito(carritoId){
        let items = await this.data.getById(carritoId);
        let carrito = new Carrito();
        if (items == null){
            items = new Array();
            
            carrito.id = 1;
            items.push(carrito);
            await this.data.save(items);
        }else{
            if (items.findIndex(x => x.id == carritoId) >= 0){
                carrito = this.items.find(x => x.id == carritoId);
            }else{
                
                carrito.id = items.length + 1;
                items.push(carrito);
                await this.data.save(items);
            }            
        }
        return carrito.id;
    }*/
    async addProductoCarrito(idProducto,carritoId){        
        let carrito = new CarritoModel();
        let controller = new ProductoController();        
        let producto = new ProductoModel();
        carrito.id = carritoId; //await this.createCarrito(carritoId);
        producto = await controller.getProductoById(idProducto)        
        carrito.productos.push(producto);
        await this.data.save(carrito);
        return carrito;
    }
    
    getProductosCarritoById(id){
        let items = this.data.getById(id);
        
        return items;
    }
    
    async deleteProductoFromCarrito(idProducto, idCarrito){
        try{
            
            await this.data.delete({id: parseInt(idCarrito), id_producto: parseInt(idProducto)});
            return this.getProductosCarritoById(idCarrito);
        }catch(error){
            throw error;
        }
    }
}

module.exports = Carrito;