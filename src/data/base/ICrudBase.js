class ICrudBase{
    constructor(){

    }
    async save(data){
        throw new Error('El metodo no esta implementado');
    }
    async update(data,id){
        throw new Error('El metodo no esta implementado');
    }
    async delete(id){
        throw new Error('El metodo no esta implementado');
    }
    async getAll(){
        throw new Error('El metodo no esta implementado');
    }
    async getById(id){
        throw new Error('El metodo no esta implementado');
    }
}

module.exports = ICrudBase;