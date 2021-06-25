class Producto{     
    constructor(){
        this.id = 0;
        this.timestamp = new Date();
        this.nombre = "";
        this.descripcion = "";
        this.codigo = 0;
        this.foto = "";
        this.precio = 0;
        this.stock =0;
        this.items= [];
    } 
    
    saveProducto(item){
        let id;
        
        if (this.items.length == 0){
            id = 1;
        }else{
            id = this.items.length + 1;
        }
        
        item.id = id;
        this.items.push(item);
        return item;
    }
    getProductos(){
        if (this.items == 0){
            throw new Error("No hay productos cargados");
        }
        return this.items;
    }
    getProductoById(id){
        let obj = this.items.find(x => x.id == id);
        if(obj == null || obj == undefined){
            throw new Error("Producto no encontrado");            
        }
        return obj;
    }
    updateProducto(prod, id){
        try{
            let index = this.items.findIndex(x => x.id == id);            
            if (index < 0)
                throw new Error("No se encontro el producto");
            prod.id = id;
            this.items.splice(index,1,prod);
            return this.items;
        }catch(error){
            throw error;
        }
    }
    deleteProducto(id){
        try{
            let index = this.items.findIndex(x => x.id == id);
            if (index < 0)
                throw new Error("No se encontro el producto");
            this.items.splice(index,1);
            return this.items;
        }catch(error){
            throw error;
        }
    }
}

module.exports = Producto;