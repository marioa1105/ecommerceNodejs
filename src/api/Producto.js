const ProductoData = require('../Data/Archivos')
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
        this.data = new ProductoData("Productos.txt");
    } 
    
    async saveProducto(item){
        let id;
        this.items = await this.data.read();
        if (this.items.length == 0){
            this.items = new Array();
            id = 1;
        }else{
            id = this.items.length + 1;
        }        
        item.id = id;
        item.codigo = id;
        item.timestamp = new Date();
        this.items.push(item);
        await this.data.save(this.items);
        return item;
    }
    async getProductos(){
        this.items = await this.data.read();
        if (this.items == 0){
            throw new Error("No hay productos cargados");
        }
        return this.items;
    }
    async getProductoById(id){
        this.items = await this.data.read();
        let obj = this.items.find(x => x.id == id);
        if(obj == null || obj == undefined){
            throw new Error("Producto no encontrado");            
        }
        return obj;
    }
    async updateProducto(prod, id){
        try{
            this.items = await this.data.read();
            let index = this.items.findIndex(x => x.id == id);            
            if (index < 0)
                throw new Error("No se encontro el producto");
            
            this.items[index].descripcion = prod.descripcion;
            this.items[index].nombre = prod.nombre;
            this.items[index].foto = prod.foto;
            this.items[index].precio = prod.precio;
            this.items[index].stock = prod.stock;
            await this.data.save(this.items);
            return this.items;
        }catch(error){
            throw error;
        }
    }
    async deleteProducto(id){
        try{
            this.items = await this.data.read();
            let index = this.items.findIndex(x => x.id == id);
            if (index < 0)
                throw new Error("No se encontro el producto");
            this.items.splice(index,1);
            await this.data.save(this.items);
            return this.items;
        }catch(error){
            throw error;
        }
    }
}

module.exports = Producto;