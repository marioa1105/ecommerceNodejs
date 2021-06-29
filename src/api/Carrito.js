const Producto = require("./Producto");
const CarritoData = require("../data/Archivos");
class Carrito{
    constructor(){
        this.id=0;
        this.timestamp= new Date();
        this.productos = new Array();
        this.items= [];
        this.data = new CarritoData('Carritos.txt');
    }
    async createCarrito(carritoId){
        let items = await this.data.read();
        let carrito = new Carrito();
        if (items.length == 0){
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
    }
    async addProductoCarrito(idProducto,carritoId){        
        let carrito;
        let index = -1;
        let producto = new Producto();
        carritoId = await this.createCarrito(carritoId);
        producto = await producto.getProductoById(idProducto)        
        this.items = await this.data.read();
        index = this.items.findIndex(x=> x.id == carritoId);                        
        this.items[index].productos.push(producto);        
        await this.data.save(this.items);
        return this.items[index];
    }
    getCarritos(){
        this.items = this.data.readSync();
        

        return this.items;
    }
    getProductosCarritoById(id){
        this.items = this.data.readSync();
        let index = this.items.findIndex(x => x.id == id);
        if(index < 0){
            return [];
        }
        return this.items[index].productos;
    }
    
    async deleteProductoFromCarrito(idProducto, idCarrito){
        try{
            this.items = await this.data.read();
            let indexCarrito = this.items.findIndex(x=> x.id == idCarrito);
            if (indexCarrito < 0)
                throw new Error("El carrito está vacio");
            
            let index = this.items[indexCarrito].productos.findIndex(x => x.id == idProducto);
            if (index < 0)
                throw new Error("No se encontro el producto");
            this.items[indexCarrito].productos.splice(index,1);
            await this.data.save(this.items);
            return this.items[indexCarrito].productos;
        }catch(error){
            throw error;
        }
    }
}

module.exports = Carrito;