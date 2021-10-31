const express = require('express');
const routes = express.Router();
const ProductosAPI = require('../api/ProductoController');
const authUser = require('../middleware/authUser');
const ProductoDto = require('../DTO/Producto');

routes.get('/nuevo',authUser.auth,(req,res) => {
    res.render('productos/nuevoProducto');
})
routes.get('/listado',authUser.auth, async(req,res) => {
    let productos = new ProductosAPI();
    let listado = await productos.getProductos();
    let hayProductos = listado.length == 0? false: true;    
    res.render('productos/detalleProductos',{hayProductos: hayProductos, productos: listado});
})

routes.get('/:id',authUser.auth,async(req,res) => {
    try{
        let apiProducto = new ProductosAPI();
        let producto = await apiProducto.getProductoById(req.params.id);
        let noExiste = producto == null? true: false;
        res.render('productos/producto', { producto: producto, noExiste: noExiste});
    }
    catch(error){
        res.render('productos/producto', { producto: new ProductoDto(), noExiste: true});
    }
   
    
})

module.exports = routes;