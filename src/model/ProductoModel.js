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
          
    } 
}

module.exports = Producto;