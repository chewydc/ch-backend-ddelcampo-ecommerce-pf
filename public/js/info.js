//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
let token = localStorage.getItem('token')
getInfoPage()

const btnLogout = document.getElementById('btnLogout')
btnLogout.addEventListener('click', () => {
    localStorage.clear()
    window.location.replace(`/logout`)
})
const btnHome = document.getElementById('btnHome')
btnHome.addEventListener('click', () => {
    window.location.replace(`/?secret_token=${token}`)
})
async function getInfoPage() {
    let info = await getInfo()
    const plantillaInfo = await buscarPlantillaInfo()
    const htmlinfo = armarHTMLinfo(plantillaInfo, info)
    document.getElementById('info').innerHTML = htmlinfo
}
function buscarPlantillaInfo() {
    return fetch('/plantillas/info.hbs')
        .then(respuesta => respuesta.text())
}
function getInfo() {
    return fetch(`/api/info/?secret_token=${token}`)
        .then(msjs => msjs.json())
}
function armarHTMLinfo(plantillaInfo, info) {
    const render = Handlebars.compile(plantillaInfo, info);
    const html = render({ info })
    return html
}