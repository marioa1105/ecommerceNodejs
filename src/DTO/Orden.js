

class Orden{
    constructor(id,timestamp,nroOrden,estado,email,carritoId){
        this.id = id;
        this.timestamp = timestamp;
        this.nroOrden = nroOrden;
        this.estado = estado;
        this.email = email;
        this.carritoId = carritoId;
    }
}

module.exports = Orden;