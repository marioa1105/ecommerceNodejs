const btnFinalizar = document.getElementById("btnFinalizarCarrito");
const bntEliminar = document.getElementById("btnEliminar");
btnFinalizar.addEventListener("click",function(e){
    e.preventDefault();    
    fetch(`/api/carrito/confirmar`, {        
        method: 'POST',
        Headers:{
            'Authorization': _TOKEN
        }
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
    fetch(`/api/carrito/borrar/` + id , {        
        method: 'DELETE',
        Headers:{
            'Authorization': _TOKEN
        }
    })
    .then(respuesta => {            
            window.location.href = '/carrito/listado';
        })    
    .catch(error => {
        console.log('ERROR', error);
    });
}
