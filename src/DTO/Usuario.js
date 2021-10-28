class UsuarioModel{
    constructor(email, password, nombre, direccion, edad, telefono, foto)
    {   
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.direccion = direccion;
        this.edad = edad;
        this.telefono = telefono;
        this.foto = foto;
    }
}

module.exports = UsuarioModel;