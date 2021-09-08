class CarritoModel{
    constructor()
    {   
        this.id=null;
        this.timestamp= new Date();
        this.productos = new Array();
        this.username=null;
    }
}

module.exports = CarritoModel;