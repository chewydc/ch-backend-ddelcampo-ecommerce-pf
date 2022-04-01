//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const socket = io.connect();
let token = localStorage.getItem('token')

let usuario = {}
buscarUsuario()

socket.on('updateMsj', async data => {
    console.log(data)
    await listarMensajes(data)
});

const btnLogout = document.getElementById('btnLogout')
btnLogout.addEventListener('click', () => {
    localStorage.clear()
    window.location.replace(`/logout`)
})
const btnHome = document.getElementById('btnHome')
btnHome.addEventListener('click', () => {
    window.location.replace(`/?secret_token=${token}`)
})

const botnEnviar = document.getElementById('btnEnviar')

document.getElementById('mensaje').addEventListener('keypress', e => {
    if (e.key === 'Enter') document.getElementById('btnEnviar').click();
});

botnEnviar.addEventListener('click', () => {
    const msj = document.getElementById('mensaje')
    let tipo = "usuario"
    if (usuario.user.admin) tipo = "sistema"
    if (msj.value) {
        console.log(`aca viene el avatar: ${usuario.user.avatar}`)
        const data = { avatar: usuario.user.avatar, email: usuario.user.email, tipo, cuerpo: msj.value };
        socket.emit('nuevoMensaje', data)
        document.getElementById('mensaje').value = "";
    }
})

async function listarMensajes(data) {
    const plantillaBody = await buscarPlantillaBody()
    let mensajes = []
    const mensajesOld = data
    mensajesOld.forEach(element => {
        if (element.tipo == "usuario") mensajes = [...mensajes, { ...element, usuario: true }]
        else mensajes = [...mensajes, { ...element, usuario: false }]
    });
    const htmlMsj = armarHTMLbody(plantillaBody, mensajes)
    document.getElementById('mensajes').innerHTML = htmlMsj
}

async function listarMensajesHeader(email, avatar) {
    const plantillaHeader = await buscarPlantillaHeader()
    const htmlEmail = armarHTMLheader(plantillaHeader, email, avatar)
    document.getElementById('email').innerHTML = htmlEmail
}

function buscarPlantillaBody() {
    return fetch('/plantillas/chat_body.hbs')
        .then(plantillaBody => plantillaBody.text())
}
function buscarPlantillaHeader() {
    return fetch('/plantillas/chat_header.hbs')
        .then(plantillaHeader => plantillaHeader.text())
}

function armarHTMLbody(plantillaBody, mensajes) {
    const render = Handlebars.compile(plantillaBody);
    const html = render({ mensajes })
    return html
}
function armarHTMLheader(plantillaHeader, email, avatar) {
    const renderEmail = Handlebars.compile(plantillaHeader);
    const htmlEmail = renderEmail({ email, avatar })
    return htmlEmail
}


function buscarInfoUsuario() {
    return fetch(`/user/profile?secret_token=${token}`)
        .then(msjs => msjs.json())
}

async function buscarUsuario() {
    usuario = await buscarInfoUsuario();
    console.log(usuario)
    listarMensajesHeader(usuario.user.email, usuario.user.avatar);
    return usuario;
}