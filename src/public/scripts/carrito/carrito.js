const btnFinalizar = document.getElementById("btnFinalizarCarrito");

btnFinalizar.addEventListener("click",function(e){
    e.preventDefault();    
    fetch(`/api/carrito/finalizar`, {        
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