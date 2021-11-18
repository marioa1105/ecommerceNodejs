const btnFinalizar = document.getElementById("btnFinalizarCarrito");
const bntEliminar = document.getElementById("btnEliminar");
btnFinalizar.addEventListener("click",function(e){
    e.preventDefault();    
    fetch(`/carrito/confirmar`, {        
        method: 'POST'
    })
    .then(respuesta => {
            alert('Compra finalizada...');
            window.location.href = '/';
        })    
    .catch(error => {
        console.log('ERROR', error);
    });
},false);

function clickEliminar(id){
    fetch(`/carrito/borrar/` + id , {        
        method: 'DELETE'
    })
    .then(respuesta => {            
            window.location.href = '/carrito/listado';
        })    
    .catch(error => {
        console.log('ERROR', error);
    });
}
