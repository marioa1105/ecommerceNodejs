const mongoose = require('mongoose');
const schema = mongoose.Schema({
    username:{type:String, require:true, unique:true},
    timestamp:{type:Date, default: Date.now},
    productos: {type:Array}
});

const Carritos = mongoose.model("carritos",schema);

module.exports = Carritos;