//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
if (localStorage.getItem('token')) {
    fetch(`/user/profile?secret_token=${localStorage.getItem('token')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async resp => {
        let user = await resp.json();
        console.log(user)
        if (user.user.email) window.location.replace(`/?secret_token=${token}`)
        else {
            localStorage.clear()
            window.location.replace(`/login`)
        }
    })
    .catch(err => {
        console.log(err)
        localStorage.clear()
        window.location.replace('/login/error')
    });
}


const botnLogin = document.getElementById('Login')
botnLogin.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let data = { email: email, password: password };
    document.getElementById('password').value = "";
    fetch('/api/usuario/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(async response => {
        if (response.status == 200) {
            let myresponse = await response.json();
            localStorage.setItem('token', myresponse.token);
            fetch(`/user/profile?secret_token=${localStorage.getItem('token')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async respUser => {
                let user = await respUser.json();
                localStorage.setItem('email', user.user.email);
                localStorage.setItem('admin', user.user.admin);
                localStorage.setItem('nombre', user.user.nombre);
                localStorage.setItem('avatar', user.user.avatar);
                localStorage.setItem('direccion', user.user.direccion);
                localStorage.setItem('telefono', user.user.telefono);
                localStorage.setItem('id', user.user.id);
                data = {email: user.user.email,direccion: user.user.direccion}
                fetch(`/api/carrito?secret_token=${localStorage.getItem('token')}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(async response => {
                    let idCarrito = await response.json();
                    localStorage.setItem('idCarrito', idCarrito);
                    window.location.replace(`/?secret_token=${localStorage.getItem('token')}`)
                })
                .catch(errCarrito => {
                    console.log(errCarrito)
                    window.location.replace('/login/error')
                })
            })
            .catch(errUser => {
                console.log(errUser)
                window.location.replace('/login/error')
            })
        }
        else{
            window.location.replace('/login/error')
        }
    })
        .catch(errLogin => {
            console.log(errLogin)
            window.location.replace('/login/error')
        });
})
