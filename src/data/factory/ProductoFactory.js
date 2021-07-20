const config = require('../config/tipoPersistencia.config.json');
const knex = require('knex');
class ProductoFactory{
    constructor(){

    }
    static getFactory(){
        try {
            let tipo = config.persistencia.filter(x => x.tipo == config.tipoPersistencia)[0].proveedor;
            let modulo = require(`../${tipo}/Producto`);
            return modulo;
        } catch (error) {
            console.log('No se encontro el tipo de persistencia');
        }
    }
}

module.exports = ProductoFactory.getFactory();