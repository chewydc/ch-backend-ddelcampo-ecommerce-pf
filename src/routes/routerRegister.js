//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
import logger from '../logs/logger.js';

const routerRegister = new Router()

// Estrategia de Register
routerRegister.get('/', (req, res) => {
    res.sendFile('register.html', { root: './public/login' })
})

// Estrategia de Register Error
routerRegister.get('/error', (req, res) => {
  res.sendFile('register-error.html', { root: './public/login' })
})

// Estrategia de Logueo ruta desconocida
routerRegister.get('*', (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
  })
  
export {routerRegister}