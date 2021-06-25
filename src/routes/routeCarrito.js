const express = require('express');
const route = express.Router();
const Carrito = require('../api/Carrito');
const Producto = require('../api/Producto');
const serviceCarrito = new Carrito();        
//TODO Agregar validacion administrador

/* route.get('/productos/listar',(req,res)=>{
    try{
        
        let items = Producto.getProducts();
        res.json(items);

    }catch(err){
        
        res.status(404).json({error: err.message});
    }   
}); */

route.get('/carrito/listar/:id',(req,res)=>{
    try{        
        
        let item = serviceCarrito.getCarritoById(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/carrito/agregar/:id',(req,res)=>{
    try{    
        let producto = new Producto();
        producto.getProductoById(req.params.id);
        let item = serviceCarrito.saveCarrito(req.body);
        res.json(item); 

    }catch(err){
        res.status(404).json({error: err.message});
    }    
}); 


route.delete('/carrito/borrar/:id',(req,res)=>{
    try{        
        let item = serviceCarrito.deleteCarrito(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

module.exports =  route;