const Producto = require("./Producto");

class Carrito{
    constructor(){
        this.id=0;
        this.timestamp= new Date();
        this.producto = new Producto();
        this.items= [];
    }
    addProductoCarrito(producto){
        let id;
        let carrito = new Carrito();
        carrito.timestamp = new Date();
        carrito.producto = producto;
        if (this.items.length == 0){
            id = 1;
        }else{
            id = this.items.length + 1;
        }
        
        item.id = id;
        this.items.push(carrito);
        return item;
    }
    getCarritos(){
        if (this.items == 0){
            throw new Error("No existe el carrito");
        }
        return this.items;
    }
    getCarritoById(id){
        let obj = this.items.find(x => x.id == id);
        if(obj == null || obj == undefined){
            throw new Error("Carrito no encontrado");            
        }
        return obj;
    }
    updateCarrito(prod, id){
        try{
            let index = this.items.findIndex(x => x.id == id);            
            if (index < 0)
                throw new Error("No se encontro el carrito");
            prod.id = id;
            this.items.splice(index,1,prod);
            return this.items;
        }catch(error){
            throw error;
        }
    }
    deleteCarrito(id){
        try{
            let index = this.items.findIndex(x => x.id == id);
            if (index < 0)
                throw new Error("No se encontro el carrito");
            this.items.splice(index,1);
            return this.items;
        }catch(error){
            throw error;
        }
    }
}

module.exports = Carrito;