const express = require('express');
const route = express.Router();
const Producto = require('../api/Producto')
const serviceProducto = new Producto();
const admin = require('../helpers/admin');
//TODO Agregar validacion administrador

route.get('/productos/listar',(req,res)=>{
    try{
        
        let items = serviceProducto.getProductos();
        res.json(items);

    }catch(err){
        
        res.status(404).json({error: err.message});
    }   
});

route.get('/productos/listar/:id',(req,res)=>{
    try{        
        let item = serviceProducto.getProductoById(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/productos/agregar',permisosAdmin, (req,res)=>{
    try{    
        
        let item = serviceProducto.saveProducto(req.body);
        res.json(item); 

    }catch(err){
        res.status(404).json({error: err.message});
    }    
}); 

route.put('/productos/actualizar/:id',permisosAdmin,(req,res)=>{
    try{        
        let item = serviceProducto.updateProducto(req.body, req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.delete('/productos/borrar/:id',permisosAdmin,(req,res)=>{
    try{        
        let item = serviceProducto.deleteProducto(req.params.id);
        res.json(item);

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

function permisosAdmin(req,res,next){
    if (admin)        
        next();
    else
        throw new Error(`${req.originalUrl} - No autorizado`);
}

module.exports =  route;