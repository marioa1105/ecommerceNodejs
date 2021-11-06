const express = require('express');
const route = express.Router();
const Carrito = require('../api/CarritoController');
const Producto = require('../api/ProductoController');
const authUser = require('../middleware/authUser');
const checkTokenAuth = require('../middleware/checkToken');
const serviceCarrito = new Carrito();  


route.get('/carrito/listar',authUser.auth,checkTokenAuth,async(req,res)=>{
    try{        
        
        let item = await serviceCarrito.getProductosCarritoById(req.session.username);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/carrito/agregar/:id',authUser.auth,checkTokenAuth,async(req,res)=>{
    try{                  
        let item = await serviceCarrito.addProductoCarrito(req.params.id, req.session.username);
        res.json(item);
    }catch(err){
        res.status(404).json({error: err.message});
    }    
}); 


route.delete('/carrito/borrar/:id',authUser.auth,checkTokenAuth,async(req,res)=>{
    try{        
        let items = await serviceCarrito.deleteProductoFromCarrito(req.params.id, req.session.username);
        res.json(items);
    }catch(err){
        res.status(404).json({error: err.message});
    }    
});
route.post('/carrito/confirmar',authUser.auth,checkTokenAuth,async(req,res)=>{
    try{                  
        let item = await serviceCarrito.finalizarCompra(req.session.username);
        res.json(item);
    }catch(err){
        res.status(404).json({error: err.message});
    }    
}); 
module.exports =  route;