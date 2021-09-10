const btnbtnAddItemCarrito = document.getElementById("btnAddItemCarrito");
btnbtnAddItemCarrito.addEventListener("click",function(e){
    e.preventDefault();    
    fetch(`/api/carrito/agregar/${btnbtnAddItemCarrito.dataset.id}`, {        
        method: 'POST'
    })
    .then(respuesta => alert('Item agregado al carrito'))    
    .catch(error => {
        console.log('ERROR', error);
    });
},false);

