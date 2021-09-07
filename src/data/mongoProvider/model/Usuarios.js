const mongoose = require('mongoose');
const schema = mongoose.Schema({
    email:{type:String, require:true, unique:true},
    password:{type:String},
    nombre: {type:String},
    direccion: {type:String},
    edad:{type:Number},    
    telefono:{type:String},
    foto:{type:String}
});

const Usuarios = mongoose.model("usuarios",schema);

module.exports = Usuarios;