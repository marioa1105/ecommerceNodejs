const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener("click",function(e){
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    fetch('/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username: email, password: password})
    }).then(res => {
        window.location.href = '/';        
    })
},false);


