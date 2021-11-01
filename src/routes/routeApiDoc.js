const express = require('express');
const route = express.Router();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            version:"1.0.0",
            title: "Doc Api",
            description: "Documentacion de la API",
            contact:{
                name:"Mario Alvarado",
                url:"www.google.com"
            },
            servers:["https://localhost:8080"]
        }
    },
    basePath:"/",
    apis:["./routeProducto.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
route.use("/",swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = route;