
const OrdenDao = require('../data/factory/FactoryDAO')('Orden');
const OrdenDto = require('../DTO/Orden');

class OrdenController {
    constructor(){                
    }
    async saveOrden(carritoId,email){
        try{
            let DAO = new OrdenDao();
            let newOrder = new OrdenDto(null, new Date(),null,"Generada->Enviada",email,carritoId);
            return await  DAO.save(newOrder);
        }catch(error){
            throw new Error(error.message)
        }
        
    }
}

module.exports = OrdenController;