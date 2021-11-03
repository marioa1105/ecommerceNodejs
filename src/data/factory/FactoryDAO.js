const config = require('../config/tipoPersistencia.config.json');
class FactoryDAO{
    constructor(){

    }
    static getFactory(entity){
        try {                        
            const provider = config.persistencia.filter(x => x.tipo == config.tipoPersistencia)[0].proveedor;
            let modulo = require(`../${provider}/${entity}`);
            return modulo;
        } catch (error) {
            console.log('No se encontro el tipo de persistencia');
        }
    }
}

module.exports = FactoryDAO.getFactory;