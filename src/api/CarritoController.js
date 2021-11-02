const ProductoModel = require("../DTO/Producto");
const ProductoController = require('./ProductoController');
const CarritoData = require("../data/factory/CarritoFactory");
const CarritoModel = require("../DTO/Carrito");
const Mailer  = require('../messaging/Mailer');
const Messaging = require('../messaging/Message');
const UsuariosController = require('./UsuarioController');
const configEnv = require('../config/config');
const OrdenController = require('./OrdenController');


class Carrito{
    constructor(){
        
        this.data = new CarritoData();
    }
    
    async addProductoCarrito(idProducto,username){        
        let carrito = new CarritoModel("",new Date(),new Array(), username);
        let controller = new ProductoController();        
        let producto = new ProductoModel();
        //carrito.username = username; //await this.createCarrito(carritoId);
        producto = await controller.getProductoById(idProducto)        
        carrito.productos.push(producto);
        await this.data.save(carrito);
        return carrito;
    }
    
    getProductosCarritoById(id){
        let items = this.data.getById(id);
        
        return items;
    }
    
    async deleteProductoFromCarrito(idProducto, idCarrito){
        try{
            
            await this.data.delete({id: idCarrito, id_producto: idProducto});
            return this.getProductosCarritoById(idCarrito);
        }catch(error){
            throw error;
        }
    }

    async finalizarCompra(username){
        let controller = new UsuariosController();
        let usuario = await controller.getUserByEmail(username);
        let carrito = await this.getProductosCarritoById(username);
        let ordenController = new OrdenController();
        let orden = await ordenController.saveOrden(carrito.id, usuario.email);
        this.notificacionCompra(carrito, usuario);
    }
    notificacionCompra(carrito, usuario){
        let mail = new Mailer(configEnv.SMTP_EMAIL,configEnv.SMTP_PASSWORD,configEnv.SMTP_FROM);
        let messaging = new Messaging(configEnv.TWILIO_SID,configEnv.TWILIO_TOKEN);
        let subject = `Nuevo pedido de ${usuario.nombre} - ${usuario.email}`;
        let bodyMail ="";
        let message = subject;
        for(let i = 0; i < carrito.productos.length; i++){
            bodyMail = bodyMail + `<p>Nombre: ${carrito.productos[i].nombre} - Precio: ${carrito.productos[i].precio}</p>`;
            message = message + `
                        Nombre: ${carrito.productos[i].nombre} - Precio: ${carrito.productos[i].precio} 
                        `;
        }        
        mail.sendMail(configEnv.EMAIL_ADMIN,subject,bodyMail);
        
        messaging.sendMessageWhatsapp(message ,'');
        return;
    }
}

module.exports = Carrito;