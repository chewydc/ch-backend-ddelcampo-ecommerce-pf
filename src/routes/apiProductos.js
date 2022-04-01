//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
import {
    getProducto, getProductos, setProducto, updateProducto, deleteProducto
} from '../controllers/productoController.js'

const apiProductos = new Router()

apiProductos.get('/', async (req, res) => {
    getProductos(function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(result)
    })
})

apiProductos.get('/:id', async (req, res) => {
    getProducto(req.params.id, function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(result)
    })
}
)

apiProductos.post('/', async (req, res) => {
    if (!req.user.admin) res.status(401).json("Acceso no autorizado. El usuario debe ser admin para acceder")
    else {
        setProducto(req.body.nombre, req.body.precio, req.body.descripcion, req.body.categoria, req.body.stock, req.body.foto, function (err, result) {
            if (err) res.status(err.estado).json(err.descripcion)
            else res.status(200).json(result)
        })
    }
})

apiProductos.put('/:id', async (req, res) => {
    if (!req.user.admin) res.status(401).json("Acceso no autorizado. El usuario debe ser admin para acceder")
    else {
        updateProducto(req.params.id, req.body.nombre, req.body.precio, req.body.descripcion, req.body.categoria, req.body.stock, req.body.foto, function (err, result) {
            if (err) res.status(err.estado).json(err.descripcion)
            else res.json(result)
        })
    }
})

apiProductos.delete('/:id', async (req, res) => {
    if (!req.user.admin) res.status(401).json("Acceso no autorizado. El usuario debe ser admin para acceder")
    else {
        await deleteProducto(req.params.id, function (err, result) {
            if (err) res.status(err.estado).json(err.descripcion)
            else res.json(result)
        })
    }
})

// Estrategia de Logueo ruta desconocida
apiProductos.get('*', (req, res) => {
    const { url, method } = req
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})

export { apiProductos }