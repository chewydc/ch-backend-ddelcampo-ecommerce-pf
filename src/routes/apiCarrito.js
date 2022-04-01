//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
import {
    getProdCarrito, getCarrito, setCarrito, deleteCarrito, setProdCarrito, deleteProdCarrito
} from '../controllers/carritoController.js'

const apiCarrito = new Router()

apiCarrito.get('/:id', async (req, res) => {
    getCarrito(req.params.id, function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(result)
    })
})

apiCarrito.get('/:id/productos', async (req, res) => {
    getProdCarrito(req.params.id, function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(result)
    })
})

// Crea un nuevo carrito y retorna el ID
apiCarrito.post('/', async (req, res) => {
    setCarrito(req.body.email, req.body.direccion, function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(result)
    })
})

// Agrega productos al carrito según su ID
apiCarrito.post('/:id/productos/:id_prod', async (req, res) => {
    setProdCarrito(req.params.id, req.params.id_prod, function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(result)
    })
})

//Elimina Carrito por su ID
apiCarrito.delete('/:id', async (req, res) => {
    deleteCarrito(req.params.id, function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(`Carrito ID: ${req.params.id} eliminado OK!`)
    })
})

//Eliminar un producto del carrito por su id de carrito y de producto
apiCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    deleteProdCarrito(req.params.id, req.params.id_prod, function (err, result) {
        if (err) res.status(err.estado).json(err.descripcion)
        else res.json(result[0].producto)
    })
})

// Estrategia de Logueo ruta desconocida
apiCarrito.get('*', (req, res) => {
    const { url, method } = req
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})

export { apiCarrito }