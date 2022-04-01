//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
import logger from '../logs/logger.js';

const routerHome = new Router()

routerHome.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public/home' })
})

routerHome.get('*', (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})
export { routerHome }