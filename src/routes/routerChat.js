//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
import logger from '../logs/logger.js';

const routerChat = new Router()


//Estrategia Chat Page
routerChat.get('/', (req, res) => {
    res.sendFile('chat.html', { root: './public/chat' })
})


// Estrategia de Logueo ruta desconocida
routerChat.get('*', (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})

export {routerChat}