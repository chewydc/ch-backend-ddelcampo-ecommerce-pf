//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import {ProductosDao as a} from '../daos/index.js'
import {CarritoDao as b} from '../daos/index.js'
import customError from '../errores/customError.js'


async function getProdCarrito(id,done) {
    let carrrito=await b.getById(id)
    if(!carrrito.length) return done (new customError (404,`Carrito id: ${id} no encontrado`))
    if(carrrito.estado) return done (new customError (carrito.estado,carrito.descripcion))
    else return done (null,carrrito[0].productos)
}

async function getCarrito(id,done) {
    let carrrito=await b.getById(id)
    if(!carrrito.length) return done (new customError (404,`Carrito id: ${id} no encontrado`))
    if(carrrito.estado) return done (new customError (carrito.estado,carrito.descripcion))
    else return done (null,carrrito[0])
}

async function setCarrito(email,direccion,done){
    const time = new Date()
    if (!email) return done (new customError (400,`Falla al generar el carrito. Campo email faltante`))
    if (!direccion) return done (new customError (400,`Falla al generar el carrito. Campo direccion faltante`))
    const nuevoCarrito = { productos: [], email: email, direccion: direccion, timestamp: time.toLocaleString() }
    const id=await b.save(nuevoCarrito)
    if (id.estado) return done (new customError (id.estado,`${id.descripcion}. ${id.detalles}`))
    else return done (null,id)
}

async function deleteCarrito(id,done){
    let carrito=await b.getById(id)
    if(!carrito.length) return done (new customError (404,`Carrito id: ${id} no encontrado`))
    else {
        const deleteId=await b.deleteById(id)
        if (deleteId.estado ) return done (new customError (deleteId.estado,deleteId.descripcion))
        else return done (null,id)
    }
}

async function deleteProdCarrito(id,id_prod,done){
    let carrito=await b.getById(id)
    if(!carrito.length) return done (new customError (404,`Carrito id: ${id} no encontrado`))
    else {
        const carritoIndex= carrito[0].productos.findIndex(p => p.id == id_prod)
        if (carritoIndex === -1) {
            return done (new customError (404,`Producto id:${id_prod} no encontrado en el carrito id:${id}`))}
        else {
            if (carrito[0].productos[carritoIndex].cantidad > 1) {
                carrito[0].productos[carritoIndex].cantidad--
                await b.update(id,carrito[0])
                }
            else {
                const newCarrito = {productos: carrito[0].productos.filter(p => p.id != id_prod), timestamp: carrito[0].timestamp,id: id}
                await b.update(id,newCarrito)
            }
        }
        return done (null,await b.getById(id))
    }
}

async function setProdCarrito(id,id_prod,done){
    let carrito=await b.getById(id)
    const productos= await a.getAll()
    if(!carrito.length) return done (new customError (404,`Carrito id: ${id} no encontrado`))
    else {
        const productoIndex = productos.findIndex(p => p.id == id_prod)
        if (productoIndex === -1) {
            return done (new customError (404,`Error al actualizar carrito. Producto ID: ${id_prod} no existe`))
        }
        else {
            const carritoIndex= carrito[0].productos.findIndex(p => p.id == id_prod) 
            if (carritoIndex !== -1) {carrito[0].productos[carritoIndex].cantidad++}
            else {
                const newProd =  {
                    "nombre": productos[productoIndex].nombre,
                    "precio": productos[productoIndex].precio,
                    "descripcion": productos[productoIndex].descripcion,
                    "foto": productos[productoIndex].foto,
                    "cantidad": 1,
                    "timestamp": productos[productoIndex].timestamp,
                    "id": productos[productoIndex].id
                } 
                carrito[0].productos.push(newProd)
                }   
            await b.update(id,carrito[0])
            return done (null,await b.getById(id))
        }
    }
}

export {getProdCarrito,getCarrito,setCarrito,deleteCarrito,setProdCarrito,deleteProdCarrito}