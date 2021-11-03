const UsuarioData = require('../data/factory/FactoryDAO')('Usuario');//require('../Data/factory/UsuarioFactory');
const Model = require('../DTO/Usuario');
const bcrypt = require('bcrypt');
const Mailer  = require('../messaging/Mailer');

class UsuarioController{     
    constructor(){        
        this.data = new UsuarioData();
    } 
    
    async saveUsuario(user){  
        user.password = this.createHash(user.password);            
        await this.data.save(user);
        return user;
    }
    async existsUser(email){
        let user = await this.data.getById(email);
        if (user.length == 0)
            return false
        else
            return true;
    }
    async getUserByEmail(email){
        let user = await this.data.getById(email);
        
        if (user.length == 0)   
            return null;
            
        return user[0];
    }
    isValidPassword (user, password) {
        return bcrypt.compareSync(password, user.password);
    }
    createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }
    notificacionUsuario(user){
        let mail = new Mailer(process.env.SMTP_EMAIL,process.env.SMTP_PASSWORD,process.env.SMTP_FROM);
        let bodyMail = `<p>Usuario: ${user.email}</p>
                        <p>Nombre: ${user.nombre}</p>
                        <p>Telefono: ${user.telefono}</p>
                        <p>Direccion: ${user.direccion}</p>`
        mail.sendMail(process.env.EMAIL_ADMIN,'Nuevo registro',bodyMail);
        return;
    }
}

module.exports = UsuarioController;