const express = require('express');
const route = express.Router();
const Carrito = require('../api/CarritoController');
const Producto = require('../api/ProductoController');
const serviceCarrito = new Carrito();  


route.get('/carrito/listar',async(req,res)=>{
    try{        
        
        let item = await serviceCarrito.getProductosCarritoById(req.query.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/carrito/agregar/:id',async(req,res)=>{
    try{                  
        let item = await serviceCarrito.addProductoCarrito(req.params.id, req.query.idCarrito);
        res.json(item);
    }catch(err){
        res.status(404).json({error: err.message});
    }    
}); 


route.delete('/carrito/borrar/:id',async(req,res)=>{
    try{        
        let items = await serviceCarrito.deleteProductoFromCarrito(req.params.id, req.query.idCarrito);
        res.json(items);
    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

module.exports =  route;