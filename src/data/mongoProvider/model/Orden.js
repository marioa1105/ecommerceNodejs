const { ObjectId } = require('bson');
const moongose = require('mongoose');
const schema= moongose.Schema({
    carritoId: {type:ObjectId},
    timestamp: {type: Date, default: Date.now},
    nroOrden:{type: Number},
    estado: {type: String},
    email: {type: String}
});

const Orden = moongose.model("Ordenes", schema);

module.exports = Orden;