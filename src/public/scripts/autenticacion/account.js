
const btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener("click",function(e){

    let newUser = {
        email : document.getElementById('txtEmail').value,
        password: document.getElementById('txtPassword').value,
        nombre: document.getElementById('txtNombre').value,
        direccion: document.getElementById('txtDireccion').value,
        edad: document.getElementById('txtEdad').value,
        telefono: document.getElementById('txtTelefono').value
    };
    
    
    fetch('/signup', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(newUser)
    }).then(res => {
        if(res.status != 400)
            alert('Se genero el usuario');
        window.location.href = res.url;
    })
},false);
