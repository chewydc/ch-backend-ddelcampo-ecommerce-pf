//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import { Router } from 'express'
const routerInfo = new Router()

routerInfo.get('/', (req, res) => res.sendFile('info.html', { root: './public/info' }))
    
routerInfo.get('*', (req, res) => {
    const { url, method } = req
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})
export {routerInfo}