const moongose = require('mongoose');
const schema= moongose.Schema({
    carritoId: {type:String},
    timestamp: {type: Date, default: Date.now},
    nroOrden:{type: Number},
    estado: {type: String},
    email: {type: String}
});

const Orden = moongose.model("Orden", schema);

module.exports = Orden;