const config = require('./tipoPersistencia.config.json');

class Connection{
    constructor(){
        this.connection = null;
          
    }
    static getConnection(){
        this.connection = config.persistencia.filter(x => x.tipo == config.tipoPersistencia)[0].connection  ;
        return this.connection;
    }
}

module.exports = Connection.getConnection();

