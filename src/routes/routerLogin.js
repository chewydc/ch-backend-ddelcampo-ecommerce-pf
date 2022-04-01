//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
import logger from '../logs/logger.js';

const routerLogin = new Router()

// Estrategia de Login Error
routerLogin.get('/error', (req, res) => {
    res.sendFile('login-error.html', { root: './public/login' })
  })
// Estrategia de Login
routerLogin.get('/', (req, res) => {
  res.sendFile('login.html', { root: './public/login' })
})

// Estrategia de Logueo ruta desconocida
routerLogin.get('*', (req, res) => {
  const { url, method } = req
  logger.warn(`Ruta ${method} ${url} no implementada`)
  res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})

export {routerLogin}