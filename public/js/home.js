//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const socket = io.connect();
let usuario = {}
let admin = false
let token = localStorage.getItem('token')
let idCarrito = localStorage.getItem('idCarrito')

buscarUsuario()

bannerUsuario()

listarProductos()

socket.on('updateProd', () => listarProductos());
socket.on('updateUser', () => {
    logout();
});
socket.on('updateCarrito', () => cargaCarrito());
socket.on('compraCarrito', () => {
    const carrito = { email: localStorage.getItem('email'), direccion: localStorage.getItem('direccion') }
    generaCarrito(carrito).then((r) => {
        localStorage.setItem('idCarrito', r)
        idCarrito = r
    })
    cargaCarritoConfirmado()
});
////////////////////////////////////////////////////////
// Banner Usuario
async function buscarUsuario() {
    usuario.email = localStorage.getItem('email')
    usuario.nombre = localStorage.getItem('nombre')
    usuario.telefono = localStorage.getItem('telefono')
    usuario.direccion = localStorage.getItem('direccion')
    usuario.avatar = localStorage.getItem('avatar')
    usuario.admin = localStorage.getItem('admin')
    if (usuario.admin == "true" || usuario.admin == true) admin = true
    usuario.id = localStorage.getItem('id')
    return usuario.email;
}
async function bannerUsuario() {
    const plantillaUser = await buscarPlantillaBanner()
    const htmlbanner = armarHTMLuser(plantillaUser, usuario.email, admin)
    document.getElementById('banner').innerHTML = htmlbanner
}
function buscarPlantillaBanner() {
    return fetch('/plantillas/banner.hbs')
        .then(plantillaBanner => plantillaBanner.text())
}
function armarHTMLuser(plantillaUser, user, admin) {
    const render = Handlebars.compile(plantillaUser, user, admin);
    const htmlbanner = render({ user, admin })
    return htmlbanner
}
function chat() {
    window.location.replace(`/chat?secret_token=${localStorage.getItem('token')}`)
}
function info() {
    window.location.replace(`/info?secret_token=${localStorage.getItem('token')}`)
}
function logout() {
    localStorage.clear()
    window.location.replace(`/login`)
}

////////////////////////////////////////////////////////
// Perfil usuario
const btnCerrarPerfil = document.getElementById('btnCerrarPerfil')
btnCerrarPerfil.addEventListener('click', () => {
    window.location.replace(`/?secret_token=${token}`)
})
async function cargaPerfil() {
    const plantillaPerfilUser = await buscarPlantillaInfoUsuario()
    const html = armarHTMLPerfilUser(plantillaPerfilUser, usuario)
    document.getElementById('perfil').innerHTML = html
}
async function cargaActualizaUser() {
    const plantillaActPerfilUser = await buscarPlantillaActInfoUsuario()
    const htmlActUser = armarHTMLPerfilActUser(plantillaActPerfilUser, usuario)
    document.getElementById('perfil').innerHTML = htmlActUser
}
function buscarPlantillaInfoUsuario() {
    return fetch('/plantillas/perfil.hbs')
        .then(PlantillaInfoUsuario => PlantillaInfoUsuario.text())
}
async function buscarPlantillaActInfoUsuario() {
    return fetch('/plantillas/actualizaPerfil.hbs')
        .then(PlantillaActInfoUsuario => PlantillaActInfoUsuario.text())
}
function armarHTMLPerfilUser(plantillaPerfilUser, user) {
    const render = Handlebars.compile(plantillaPerfilUser, user);
    const html = render({ user })
    return html
}
function armarHTMLPerfilActUser(plantillaActPerfilUser, user) {
    const render = Handlebars.compile(plantillaActPerfilUser, user);
    const html = render({ user })
    return html
}
function actualizaPerfilUsuario(idUser) {
    const form = document.querySelector('form');
    const data = {
        nombre: form[0].value,
        telefono: form[1].value,
        email: form[2].value,
        direccion: form[3].value,
        admin: form[4].value,
        avatar: form[5].value
    };
    fetch(`/user/profile/${idUser}?secret_token=${token}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data)
    })
        .then(socket.emit('updateUser', `Se actualizo el Usuario id: ${idUser}`))
        .catch(error => console.error(error))
}
////////////////////////////////////////////////////////
// Productos
const btnCerrarCarga = document.getElementById('btnCerrarCarga')
btnCerrarCarga.addEventListener('click', () => {
    window.location.replace(`/?secret_token=${token}`)
})
async function buscarProductos() {
    return fetch(`/api/productos?secret_token=${token}`)
        .then(prod => {
            if (prod.ok) return prod.json()
            else return null
        })
}
async function buscarProducto(id) {
    return fetch(`/api/productos/${id}?secret_token=${token}`)
        .then(prod => prod.json())
}
async function cargaProd() {
    const form = document.querySelector('form');
    const data = {
        nombre: form[0].value,
        precio: form[1].value,
        descripcion: form[2].value,
        categoria: form[3].value,
        stock: form[4].value,
        foto: form[5].value
    };
    fetch(`/api/productos?secret_token=${token}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then((resp) => {
            socket.emit('updateProd', `Se cargo nuevo Producto! ${resp}`);
            window.location.replace(`/?secret_token=${token}`)
        })
        .catch((error) => {
            console.error(error);
            window.location.replace(`/?secret_token=${token}`)
        })
}
async function actualizarProd(id) {
    const form = document.querySelector('form');
    const data = {
        nombre: form[0].value,
        precio: form[1].value,
        descripcion: form[2].value,
        categoria: form[3].value,
        stock: form[4].value,
        foto: form[5].value
    };
    await fetch(`/api/productos/${id}?secret_token=${token}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data)
    })
        .then(socket.emit('updateProd', `Se actualizo el producto id: ${id}`))
        .catch(error => console.error(error))
}
async function eliminarProd(id) {
    await fetch(`/api/productos/${id}?secret_token=${token}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
        .then(resp => {
            socket.emit('updateProd', `Se elimino el producto id: ${id}`)
            window.location.replace(`/?secret_token=${token}`)
        })
        .catch(error => console.error(error))
}
async function listarProductos() {
    const plantillaProd = await buscarPlantillaProducto()
    const productos = await buscarProductos()
    const html = armarHTMLproductos(plantillaProd, productos, admin)
    document.getElementById('productos').innerHTML = html
}
async function cargaPaginaProd() {
    const plantillaCarga = await buscarPlantillaCargaProd()
    const html = armarHTMLcarga(plantillaCarga, admin)
    document.getElementById('carga').innerHTML = html
}
async function cargaActualizaProd(id) {
    const plantillaAct = await buscarPlantillaActProd()
    const prod = await buscarProducto(id)
    const html = armarHTMLactualizaProd(plantillaAct, prod)
    document.getElementById('carga').innerHTML = html
}
function buscarPlantillaProducto() {
    return fetch('/plantillas/productos.hbs')
        .then(respuesta => respuesta.text())
}
function buscarPlantillaCargaProd() {
    return fetch('/plantillas/cargaProd.hbs')
        .then(respuesta => respuesta.text())
}
function buscarPlantillaActProd() {
    return fetch('/plantillas/actualizaProd.hbs')
        .then(respuesta => respuesta.text())
}
function armarHTMLproductos(plantillaProd, productos, admin) {
    const render = Handlebars.compile(plantillaProd);
    const html = render({ productos, admin })
    return html
}
function armarHTMLcarga(plantillaCarga, admin) {
    const render = Handlebars.compile(plantillaCarga, admin);
    const html = render({ admin })
    return html
}
function armarHTMLactualizaProd(plantillaAct, prod) {
    const render = Handlebars.compile(plantillaAct);
    const html = render({ prod })
    return html
}
////////////////////////////////////////////////////////
// Carrito
const btnCerrarCarrito = document.getElementById('btnCerrarCarrito')
btnCerrarCarrito.addEventListener('click', () => {
    window.location.replace(`/?secret_token=${token}`)
})
async function buscarProdCarrito(idCarrito) {
    return fetch(`/api/carrito/${idCarrito}/productos?secret_token=${localStorage.getItem('token')}`)
        .then(prod => prod.json())
}

async function generaCarrito(data) {
    return fetch(`/api/carrito?secret_token=${localStorage.getItem('token')}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error(error))
}

async function agregarProdCarrito(id_prod) {
    fetch(`/api/carrito/${idCarrito}/productos/${id_prod}?secret_token=${localStorage.getItem('token')}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(socket.emit('updateCarrito', `Se agrego Producto id ${id_prod} al Carrito id ${idCarrito}!`))
        .catch(error => console.error(error))
}
async function eliminarProdCarrito(id_prod) {
    fetch(`/api/carrito/${idCarrito}/productos/${id_prod}?secret_token=${localStorage.getItem('token')}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
        .then(() => {
            socket.emit('updateCarrito', `Se elimino Producto id ${id_prod} del Carrito id ${idCarrito}!`)
        })
        .catch(error => console.error(error))
}
async function cargaCarrito() {
    const prods_carrito = await buscarProdCarrito(idCarrito)
    const plantillaCarrito = await buscarPlantillaCarrito()
    const html = armarHTMLcarrito(plantillaCarrito, prods_carrito, idCarrito, localStorage.getItem('direccion'))
    document.getElementById('carrito').innerHTML = html
}
async function cargaCarritoConfirmado() {
    const prods_carrito_conf = await buscarProdCarrito(idCarrito)
    const plantillaCarrito_conf = await buscarPlantillaCarritoConfirmado()
    const html = armarHTMLcarrito(plantillaCarrito_conf, prods_carrito_conf, idCarrito, localStorage.getItem('direccion'))
    document.getElementById('carrito').innerHTML = html
}
function buscarPlantillaCarrito() {
    return fetch('/plantillas/carrito.hbs')
        .then(respuesta => respuesta.text())
}
function buscarPlantillaCarritoConfirmado() {
    return fetch('/plantillas/carritoConfirm.hbs')
        .then(respuesta => respuesta.text())
}
function armarHTMLcarrito(plantillaCarrito, prods_carrito, idCarrito, direccion) {
    const render = Handlebars.compile(plantillaCarrito);
    const html = render({ prods_carrito, idCarrito, direccion })
    return html
}
async function confirmarCarrito(idCarrito) {
    fetch(`/api/ordenes/${idCarrito}?secret_token=${localStorage.getItem('token')}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(socket.emit('compraCarrito', `Se confirmo la compra del Carrito id ${idCarrito}!`))
        .catch(error => console.error(error))
}
////////////////////////////////////////////////////////
// Ordenes
async function cargaOrdenes() {
    const plantillaOrdenes = await buscarPlantillaOrdenes()
    const ordenes = await listarOrdenes(usuario.email)
    const htmlOrdenes = armarHTMLOrdenes(plantillaOrdenes, ordenes)
    document.getElementById('ordenes').innerHTML = htmlOrdenes
}
function buscarPlantillaOrdenes() {
    return fetch('/plantillas/ordenes.hbs')
        .then(PlantillaOrdenes => PlantillaOrdenes.text())
}
function armarHTMLOrdenes(plantillaOrdenes, ordenes) {
    const render = Handlebars.compile(plantillaOrdenes, ordenes);
    const html = render({ ordenes })
    return html
}
async function listarOrdenes(email) {
    return fetch(`/api/ordenes/${email}?secret_token=${token}`)
        .then(ords => ords.json())
}

async function getInfoOrder(id) {
    console.log(id)
    const plantillaOrden = await buscarPlantillaOrden()
    const orden = await listarOrdenes(id)
    console.log(orden)
    const htmlOrdenes = armarHTMLOrden(plantillaOrden, orden)
    document.getElementById('ordenes').innerHTML = htmlOrdenes
}
function buscarPlantillaOrden() {
    return fetch('/plantillas/orden.hbs')
        .then(PlantillaOrden => PlantillaOrden.text())
}
function armarHTMLOrden(plantillaOrden, orden) {
    const render = Handlebars.compile(plantillaOrden, orden);
    const html = render({ orden })
    return html
}
////////////////////////////////////////////////////////

