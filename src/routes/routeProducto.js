const express = require('express');
const route = express.Router();
const Producto = require('../api/Producto')
const serviceProducto = new Producto();
const admin = require('../helpers/admin');
//TODO Agregar validacion administrador

route.get('/productos/listar',(req,res)=>{
    try{                
        serviceProducto.getProductos()
                        .then(items => res.json(items))
                        ;
        

    }catch(err){
        
        res.status(404).json({error: err.message});
    }   
});

route.get('/productos/listar/:id',(req,res)=>{
    try{        
        serviceProducto.getProductoById(req.params.id).then(item => res.json(item));
        

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.post('/productos/agregar',permisosAdmin, (req,res)=>{
    try{    
        
        serviceProducto.saveProducto(req.body).then(item => {
            res.json(item); 
        });
        

    }catch(err){
        res.status(404).json({error: err.message});
    }    
}); 

route.put('/productos/actualizar/:id',permisosAdmin,(req,res)=>{
    try{        
        serviceProducto.updateProducto(req.body, req.params.id).then(item => res.json(item));
        

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

route.delete('/productos/borrar/:id',permisosAdmin,(req,res)=>{
    try{        
        serviceProducto.deleteProducto(req.params.id)
                        .then(items => res.json(items))
                        ;
        

    }catch(err){
        res.status(404).json({error: err.message});
    }    
});

function permisosAdmin(req,res,next){
    if (admin)        
        next();
    else
        throw new Error(`Ruta ${req.originalUrl} metodo ${req.method} - No autorizado`);
}

module.exports =  route;