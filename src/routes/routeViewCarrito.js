const express = require('express');
const route = express.Router();
const authUser = require('../middleware/authUser');
const axios = require('axios');
const configEnv = require('../config/config');
const CarritoDto = require('../DTO/Carrito');

route.post('/agregar/:id',authUser.auth,async(req,res)=>{
    axios(
        {
            url:`/carrito/agregar/${req.params.id}`,
            method:'post',
            baseURL: `${configEnv.HOST}:${configEnv.PORT}/${configEnv.V_API}`,
            withCredentials: true,
            headers:{
                'Authorization': req.session.token,
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json'
            }
        }
    ).then(function(response){                
        res.send(response.data);
    });  
})
route.get('/listado',authUser.auth, async(req,res) => {
    axios(
        {
            url:'/carrito/listar',
            method:'get',
            baseURL: `${configEnv.HOST}:${configEnv.PORT}/${configEnv.V_API}`,
            withCredentials: true,
            headers:{
                Authorization: req.session.token
            }
        }
    ).then(function(response){                
        
        let carrito = new CarritoDto(response.data.id, response.data.timestamp,
            response.data.productos, response.data.username);
         
        let hayProductos = false;
        let productos = [];
        
        
        productos = carrito.productos.map(x => {
            return {
                id: x.id,
                title: x.nombre,
                price: x.precio,
                thumbnail: x.foto
            }
        })
         

        
        
        hayProductos = productos.length > 0? true:false;

        res.render('carrito/listado',{hayProductos: hayProductos, productos: productos});
    }); 
    
})
route.post('/confirmar',async(req,res)=>{
    let response = await axios(
                        {
                            url:'/carrito/confirmar',
                            method:'post',
                            baseURL: `${configEnv.HOST}:${configEnv.PORT}/${configEnv.V_API}`,
                            withCredentials: true,
                            headers:{
                                Authorization: req.session.token
                            }
                        }
                    )
    res.send(response.data);
});
module.exports = route;