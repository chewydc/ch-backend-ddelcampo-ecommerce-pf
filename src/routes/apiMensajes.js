//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import {Router} from 'express'
import {getMensajes,getMensajesByEmail,setMensaje,deleteMensaje} from '../controllers/mensajesController.js'

const apiMensajes = new Router()

apiMensajes.get('/', async (req, res) => {
    getMensajes(function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(result)
    })
})

apiMensajes.get('/:email', async (req, res) => {
    getMensajesByEmail(req.params.email,function (err, result) {
    if (err) res.status(err.estado).json(err.descripcion)
    else res.json(result)
    })
})

apiMensajes.post('/', async (req,res)=> {
    setMensaje(req.body.avatar,req.body.email,req.body.tipo,req.body.cuerpo,function (err,result){
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(result)    
        })
})

apiMensajes.delete('/:id', async (req,res)=> {
    if (!req.user.admin) res.status(401).json("Acceso no autorizado. El usuario debe ser admin para acceder")
    else {
        deleteMensaje(req.params.id,function (err,result){
            if (err) res.status(err.estado).json(err.descripcion)
            else res.json(result)    
            })
    }
})

// Estrategia de Logueo ruta desconocida
apiMensajes.get('*', (req, res) => {
    const { url, method } = req
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})

export {apiMensajes}