const UsuarioData = require('../Data/factory/UsuarioFactory');
const Model = require('../model/UsuarioModel');
const bcrypt = require('bcrypt');

class UsuarioController{     
    constructor(){        
        this.data = new UsuarioData();
    } 
    
    async saveUsuario(user){  
        user.password = this.createHash(user.password);            
        await this.data.save(user);
        return user;
    }
    
    async getUserByEmail(email){
        let user = await this.data.getById(email);
                
        return item;
    }
    isValidPassword (user, password) {
        return bcrypt.compareSync(password, user.Password);
    }
    createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }
}

module.exports = UsuarioController;