const mongoose = require('mongoose');
const schema = mongoose.Schema({
    id:{type:Number, require:true, unique:true},
    timestamp:{type:Date, default: Date.now},
    nombre: {type:String},
    descripcion: {type:String},
    precio:{type:Number},    
    codigo:{type:Number},
    foto:{type:String},
    stock:{type:Number},
});

const Productos = mongoose.model("productos",schema);

module.exports = Productos;