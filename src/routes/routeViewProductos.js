const express = require('express');
const routes = express.Router();

const authUser = require('../middleware/authUser');
const ProductoDto = require('../DTO/Producto');
const axios = require('axios');
const configEnv = require('../config/config');
routes.get('/nuevo',authUser.auth,(req,res) => {
    res.render('productos/nuevoProducto');
})

routes.get('/listado',authUser.auth, async(req,res) => {
    
    axios(
        {
            url:'/productos/listar',
            method:'get',
            baseURL: `${configEnv.HOST}:${configEnv.PORT}/${configEnv.V_API}`,
            headers:{
                Authorization: req.session.token
            }
        }
    ).then(function(response){        
        let hayProductos = response.data.length == 0? false: true;    
        res.render('productos/detalleProductos',{hayProductos: hayProductos, productos: response.data});
    });    
})

routes.post('/agregar',authUser.auth, async(req,res) => {    
    axios(
        {
            url:'/productos/agregar',
            method:'post',
            baseURL: `${configEnv.HOST}:${configEnv.PORT}/${configEnv.V_API}`,
            withCredentials: true,
            headers:{
                Authorization: req.session.token
            },
            data:req.body
        }
    ).then(function(response){                
        res.send(response.data);
    });  
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