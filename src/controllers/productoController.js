//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import {ProductosDao as a} from '../daos/index.js'
import customError from '../errores/customError.js'

async function getProducto(id,done) {
    let prod=await a.getById(id)
    if(!prod.length) return done (new customError (404,`Producto id: ${id} no encontrado`))
    if(prod.estado) return done (new customError (prod.estado,prod.descripcion))
    return done (null,prod)
}

async function getProductos(done) {
    let prods=await a.getAll()
    if(!prods.length) return done (new customError (404,`No se encontraron productos`))
    if(prods.estado) return done (new customError (prods.estado,prods.descripcion))
    return done (null,prods)
}

async function setProducto( n,p,d,c,s,f,done){
    if ( !n || !p || !d || !c ||!s || !f ) return done (new customError (400,`Falla al cargar el producto. Campo faltante o erroneo`))
    const time = new Date()
    const nuevoProducto = {nombre:n,precio:p,descripcion:d,categoria:c,stock:s,foto:f, timestamp: time.toLocaleString() }
    const id= await a.save(nuevoProducto)
    if (id.estado) return done (new customError (id.estado,`${id.descripcion}. ${id.detalles}`))
    else return done (null,`Nuevo producto ID: ${id} cargado OK!`)
}

async function updateProducto(id,n,p,d,c,s,f,done){
    if ( !id || !n || !p || !d || !c || !s || !f ) return done (new customError (400,`Falla al actualizar el producto. Campo faltante`))
    const time = new Date()
    const nuevoProducto = {nombre:n,precio:p,descripcion:d,categoria:c,stock:s,foto:f, timestamp: time.toLocaleString() }
    const prodUpdated=await a.update(id,nuevoProducto)
    if (prodUpdated.estado) return done (new customError (prodUpdated.estado,prodUpdated.descripcion))
    else return done (null, prodUpdated)
}

async function deleteProducto(id,done) {
    let producto=await a.getById(id)
    if(!producto.length) return done (new customError (404,`Producto id: ${id} no encontrado`))
    else {
        let delProd=await a.deleteById(id)
        if (delProd.estado) return done (new customError (404,`Producto id: ${id} no encontrado`))
        else return done (null,`Producto ID: ${id} eliminado OK!`)
    }

}



export {getProductos,getProducto,setProducto,updateProducto,deleteProducto}