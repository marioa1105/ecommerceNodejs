const express = require('express');
const route = express.Router();
const Producto = require('../api/Producto')
const serviceProducto = new Producto();
//TODO Agregar validacion administrador

route.get('/productos/listar',(req,res)=>{
    try{
        
        let items = serviceProducto.getProducts();
        res.json(items);

    }catch(err){
        
        res.status(404).json({error: err.message});
    }   
});

route.get('/productos/listar/:id',(req,res)=>{
    try{        
        let item = serviceProducto.getProductById(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/productos/agregar',(req,res)=>{
    try{    
        
        let item = serviceProducto.saveProduct(req.body);
        res.json(item); 

    }catch(err){
        res.status(404).json({error: err.message});
    }    
}); 

route.put('/productos/actualizar/:id',(req,res)=>{
    try{        
        let item = serviceProducto.updateProduct(req.body, req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.delete('/productos/borrar/:id',(req,res)=>{
    try{        
        let item = serviceProducto.deleteProduct(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

module.exports =  route;