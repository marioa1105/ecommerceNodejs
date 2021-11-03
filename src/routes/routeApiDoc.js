const express = require('express');
const route = express.Router();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const docSwagger = require('../helpers/swagger.json');



route.use("/api-docs",swaggerUI.serve);
route.get("/api-docs",swaggerUI.setup(docSwagger))
module.exports = route;