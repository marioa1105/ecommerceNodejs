const ProductoModel = require("../model/ProductoModel");
const ProductoController = require('./ProductoController');
const CarritoData = require("../data/factory/CarritoFactory");
const CarritoModel = require("../model/CarritoModel");
const Mailer  = require('../messaging/Mailer');
const Messaging = require('../messaging/Message');
const UsuariosController = require('./UsuarioController');
class Carrito{
    constructor(){
        
        this.data = new CarritoData();
    }
    
    async addProductoCarrito(idProducto,username){        
        let carrito = new CarritoModel();
        let controller = new ProductoController();        
        let producto = new ProductoModel();
        carrito.username = username; //await this.createCarrito(carritoId);
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
            
            await this.data.delete({id: parseInt(idCarrito), id_producto: parseInt(idProducto)});
            return this.getProductosCarritoById(idCarrito);
        }catch(error){
            throw error;
        }
    }

    async finalizarCompra(username){
        let controller = new UsuariosController();
        let usuario = await controller.getUserByEmail(username);
        let carrito = await this.getProductosCarritoById(username);
        this.notificacionCompra(carrito[0], usuario);
    }
    notificacionCompra(carrito, usuario){
        let mail = new Mailer(process.env.SMTP_EMAIL,process.env.SMTP_PASSWORD,process.env.SMTP_FROM);
        let messaging = new Messaging(process.env.TWILIO_SID,process.env.TWILIO_TOKEN);
        let subject = `Nuevo pedido de ${usuario.nombre} - ${usuario.email}`;
        let bodyMail ="";
        let message = subject;
        for(let i = 0; i < carrito.productos.length; i++){
            bodyMail = bodyMail + `<p>Nombre: ${carrito.productos[i].nombre} - Precio: ${carrito.productos[i].precio}</p>`;
            message = message + `
                        Nombre: ${carrito.productos[i].nombre} - Precio: ${carrito.productos[i].precio} 
                        `;
        }        
        mail.sendMail(process.env.EMAIL_ADMIN,subject,bodyMail);
        
        messaging.sendMessageWhatsapp(message ,'');
        return;
    }
}

module.exports = Carrito;