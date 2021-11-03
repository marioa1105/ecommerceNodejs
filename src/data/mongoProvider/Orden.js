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
            let lastOrder = await Model.find({}).sort({nroOrden: -1}).limit(1);
            if (lastOrder.length == 0)
            {
                return 1
            }
            
            return lastOrder[0].nroOrden + 1;
        }catch(error){
            return 1;
        }
    }
}

module.exports = Orden;