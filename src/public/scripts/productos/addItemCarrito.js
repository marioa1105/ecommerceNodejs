const btnbtnAddItemCarrito = document.getElementById("btnAddItemCarrito");

function addItemClick(id){
    fetch(`/api/carrito/agregar/` + id, {        
        method: 'POST',
        Headers:{
            'Authorization': _TOKEN
        }
    })
    .then(respuesta => alert('Item agregado al carrito'))    
    .catch(error => {
        console.log('ERROR', error);
    });
}

