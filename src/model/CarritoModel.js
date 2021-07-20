class CarritoModel{
    constructor()
    {   
        this.id=null;
        this.timestamp= new Date();
        this.productos = new Array();
    }
}

module.exports = CarritoModel;