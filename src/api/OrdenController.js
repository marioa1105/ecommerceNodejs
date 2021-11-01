const Factory = require('../data/factory/Factory');
const OrdenDto = require('../DTO/Orden');
class OrdenController {
    constructor(){
        let Modulo = Factory.getFactory('Orden');
        this.OrdenData = new Modulo();
    }
    async saveOrden(carritoId,email){
        try{
            let newOrder = new OrdenDto(null, new Date(),null,"Generada->Enviada",email,carritoId);
            return await  this.OrdenData.save(newOrder);
        }catch(error){
            throw new Error(error.message)
        }
        
    }
}

module.exports = OrdenController;