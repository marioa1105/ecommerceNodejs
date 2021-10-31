const express = require('express');
const route = express.Router();
const authUser = require('../middleware/authUser');
const CarritoController = require('../api/CarritoController');
//CARRITO
route.get('/listado',authUser.auth, async(req,res) => {
    let controller = new CarritoController();
    let carrito = await controller.getProductosCarritoById(req.session.username);
    let hayProductos = false;
    let productos = [];
    
    productos = carrito.productos.map(x => {
        return {
            id: x.id,
            title: x.nombre,
            price: x.precio,
            thumbnail: x.foto
        }
    })
    
    hayProductos = productos.length > 0? true:false;

    res.render('carrito/listado',{hayProductos: hayProductos, productos: productos});
})

module.exports = route;