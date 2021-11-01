const Model = require('./model/Orden');
const IBase = require('../base/ICrudBase');
class Orden extends IBase{
    constructor(){

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
            throw new Error(error.message);
        }
    }
}

module.exports = Orden;