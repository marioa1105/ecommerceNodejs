const express = require('express');
const route = express.Router();
const Carrito = require('../api/Carrito');
const Producto = require('../api/Producto');
const serviceCarrito = new Carrito();  
let carrito = new Carrito();      
//TODO Agregar validacion administrador

/* route.get('/productos/listar',(req,res)=>{
    try{
        
        let items = Producto.getProducts();
        res.json(items);

    }catch(err){
        
        res.status(404).json({error: err.message});
    }   
}); */

route.get('/carrito/listar',(req,res)=>{
    try{        
        
        let item = serviceCarrito.getProductosCarritoById(req.query.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/carrito/agregar/:id',(req,res)=>{
    try{  
        let producto = new Producto();
        
        serviceCarrito.addProductoCarrito(req.params.id, req.query.idCarrito).then(item => res.json(item));
    }catch(err){
        res.status(404).json({error: err.message});
    }    
}); 


route.delete('/carrito/borrar/:id',(req,res)=>{
    try{        
        serviceCarrito.deleteProductoFromCarrito(req.params.id, req.query.idCarrito)
                        .then(items => res.json(items))
                        .catch(err => {
                            res.status(404).json({error: err.message});
                        });        
    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

module.exports =  route;