//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
import {getOrden,getOrdenByEmail,setOrden,deleteOrden} from '../controllers/ordenesController.js'

const apiOrdenes = new Router()

apiOrdenes.get('/:id',  async (req, res) => {
    if(isNaN(req.params.id)){
        getOrdenByEmail(req.params.id, function (err, result) {
            if (err) res.status(err.estado).json(err.descripcion)
            else res.json(result)
        })
    }
    else { 
        getOrden(req.params.id, function (err, result) {
            if (err) res.status(err.estado).json(err.descripcion)
            else res.json(result)
    })
    }
})

apiOrdenes.post('/:id',  async (req, res) => {
    await setOrden(req.params.id, function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(`Orden ${result} creada con exito.`)
    })
})

//Elimina Orden por su ID
apiOrdenes.delete('/:id',  async (req, res) => {
    if (!req.user.admin) res.status(401).json("Acceso no autorizado")
    else {
        deleteOrden(req.params.id, function (err, result) {
            if (err) res.status(err.estado).json(err.descripcion)
            else res.json(`Orden ID: ${req.params.id} eliminado OK!`)
        })
    }
})

// Estrategia de Logueo ruta desconocida
apiOrdenes.get('*', (req, res) => {
    const { url, method } = req
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
  })


export {apiOrdenes}