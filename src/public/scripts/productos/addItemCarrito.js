const btnbtnAddItemCarrito = document.getElementById("btnAddItemCarrito");

function addItemClick(id){
    fetch(`/carrito/agregar/` + id, {        
        method: 'POST'
    })
    .then(respuesta => alert('Item agregado al carrito'))    
    .catch(error => {
        console.log('ERROR', error);
    });
}

