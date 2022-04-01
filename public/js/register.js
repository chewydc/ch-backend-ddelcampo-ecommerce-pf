//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------

const botnRegister = document.getElementById('Register')
botnRegister.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value
    const telefono = document.getElementById('telefono').value
    const direccion = document.getElementById('direccion').value
    const avatar = document.getElementById('avatar').value
    const data = { nombre, email, password, passwordConfirm, telefono, direccion, avatar };
    document.getElementById('nombre').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('passwordConfirm').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('direccion').value = "";
    document.getElementById('avatar').value = "";
    fetch('/api/usuario/register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(async response => {
        if (response.status == 200) {
            localStorage.clear();
            window.location.replace(`/login`)
        }
        else {
            window.location.replace('/register/error')
        }
    })
        .catch(err => {
            console.log(err)
            window.location.replace('/register/error')
        });
})
