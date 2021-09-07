const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener("click",function(e){

    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    fetch('/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username: email, password: password})
    }).then(res => {
        
        window.location.href = res.url;
    })
},false);


