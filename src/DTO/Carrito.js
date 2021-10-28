class CarritoModel{
    constructor(id, timestamp, productos, username)
    {   
        this.id=id;
        this.timestamp= timestamp;
        this.productos = productos;
        this.username= username;
    }
}

module.exports = CarritoModel;