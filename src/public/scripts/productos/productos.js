
const btnEnviar = document.getElementById("btnEnviar");
btnEnviar.addEventListener("click",function(e){
    e.preventDefault();
    
    const data = { nombre: document.getElementById('nombre').value, 
                    precio: document.getElementById('precio').value, 
                    foto: document.getElementById('thumbnail').value,
                    stock: document.getElementById('stock').value,
                    descripcion: document.getElementById('descripcion').value };
    console.log(data);
    fetch('/productos/agregar', {
        Headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => console.log(respuesta.json()))
    .then(productos => {
        document.querySelector('form').reset();        
    })
    .catch(error => {
        console.log('ERROR', error);
    });
    
},false);
