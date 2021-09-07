const config = require('../config/tipoPersistencia.config.json');
class UsuarioFactory{
    constructor(){

    }
    static getFactory(){
        try {
            let tipo = config.persistencia.filter(x => x.tipo == config.tipoPersistencia)[0].proveedor;
            let modulo = require(`../${tipo}/Usuario`);
            return modulo;
        } catch (error) {
            console.log('No se encontro el tipo de persistencia');
        }
    }
}

module.exports = UsuarioFactory.getFactory();