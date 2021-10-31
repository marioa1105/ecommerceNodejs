const express = require('express');
const routes = express.Router();
const ProductosController = require('../api/ProductoController');
const authUser = require('../middleware/authUser');

routes.get('/nuevo',authUser.auth,(req,res) => {
    res.render('productos/nuevoProducto');
})
routes.get('/listado',authUser.auth, async(req,res) => {
    let productos = new ProductosController();
    let listado = await productos.getProductos();
    let hayProductos = listado.length == 0? false: true;    
    res.render('productos/detalleProductos',{hayProductos: hayProductos, productos: listado});
})

module.exports = routes;