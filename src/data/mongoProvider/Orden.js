const Model = require('./model/Orden');
const IBase = require('../base/ICrudBase');
const mongoose = require('mongoose');
const connection = require('../config/Connection');
class Orden extends IBase{
    constructor(){
        super();
        mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=> {
                console.log('Conexion exitosa');
            });
    }
    async save(orden){
        try{
            orden.nroOrden = await this.getLastOrder();            
            await Model.create(orden);
        }catch(error){
            throw new Error(error.message);
        }
    }
    async getLastOrder(){
        try{
            let lastOrder = await Model.findOne({nroOrden}).sort({nroOrden: "desc"}).limit(1);
            lastOrder = lastOrder + 1 || 1;
            return lastOrden;
        }catch(error){
            return 1;
        }
    }
}

module.exports = Orden;