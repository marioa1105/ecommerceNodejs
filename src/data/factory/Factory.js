const config = require('../config/tipoPersistencia.config.json');
class Factory{
    constructor(){

    }
    static getFactory(entity){
        try {
            let tipo = config.persistencia.filter(x => x.tipo == config.tipoPersistencia)[0].proveedor;
            let modulo = require(`../${tipo}/${entity}`);
            return modulo;
        } catch (error) {
            console.log('No se encontro el tipo de persistencia');
        }
    }
}

module.exports = Factory;