//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import {ProductosDao as a} from '../daos/index.js'
import {CarritoDao as b} from '../daos/index.js'
import {OrdenesDao as c} from '../daos/index.js'
import customError from '../errores/customError.js'

import {default as config} from '../config.js'
import { createTransport } from "nodemailer";
import logger from '../logs/logger.js';
const email= config.adminAccount.mail
const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: email,
        pass: config.adminAccount.pass
    }
});

async function getOrden(id,done) {
    let orden=await c.getById(id)
    if(!orden.length) return done (new customError (404,`Orden id: ${id} no encontrada`))
    if(orden.estado) return done (new customError (orden.estado,orden.descripcion))
    else return done (null,orden)
}

async function getOrdenByEmail(email,done) {
    let orden=await c.getByEmail(email)
    if(!orden.length) return done (new customError (404,`Orden con email: ${email} no encontrada`))
    if(orden.estado) return done (new customError (orden.estado,orden.descripcion))
    else return done (null,orden)
}
async function setOrden(idCarrito, done) {
    let carrito = await b.getById(idCarrito)
    if (!carrito.length) return done(new customError(404, `Carrito id: ${idCarrito} no encontrado`))
    if (!carrito[0].productos) return done(new customError(400, `Carrito id: ${idCarrito} esta vacio`))
    if (carrito.estado) return done(new customError(carrito.estado, carrito.descripcion))
    else {
        let stock = await updateStockProducto(idCarrito,function (err, result) {
            if (err) return (new customError(err.estado, err.descripcion))
            else return result
        })
        if (stock.estado) return done(new customError(stock.estado, stock.descripcion))
        const time = new Date()
        const orden = { items: carrito[0].productos, email: carrito[0].email, direccion: carrito[0].direccion, estado: "generada", timestamp: time.toLocaleString() }
        const ordenId = await c.save(orden)
        if (ordenId.estado) return done(new customError(ordenId.estado, `${ordenId.descripcion}. ${ordenId.detalles}`))
        else {
            let enviomail = sendConfirmOrdenEmail(ordenId, carrito[0].id,email, carrito[0].email, carrito[0].direccion, JSON.stringify(carrito[0].productos), "generada", function (err, result) {
                if (err) return (new customError(err.estado, err.descripcion))
                else return result
            })
            if (enviomail.estado) { return done(new customError(enviomail.estado, enviomail.descripcion)) }
            else return done(null, ordenId)
        }
    }
}

async function sendConfirmOrdenEmail(orderId,carritoId,adminEmail,clientEmail,direccion,items,estado,done) {
    try {
        transporter.sendMail({
            from: 'confirmacion_orden@ecommerce.nodejs',
            to: adminEmail,
            subject: `Nuevo pedido de ${clientEmail}`,
            html: `DATOS:
        ID Orden: ${orderId},
        ID del Carrito: ${carritoId},
        Direccion de Entrega: ${direccion},
        Productos: ${items}
    `})
        logger.info(`Mail confirmacion orden id: ${orderId} enviado OK`)
        return done(null, `Orden en estado: ${estado}`)
    } catch (error) {
        logger.error(error)
        return done(new customError(500, `Error en el envio de mail`))
    }
}

async function updateStockProducto(idCarrito,done) {
    let carrito=await b.getById(idCarrito)
    let productos=await a.getAll()
    let newProductos=[]
    if(!carrito.length) return done (new customError (404,`Carrito id: ${idCarrito} no encontrado`))
    if(!productos.length) return done (new customError (404,`Items del carrito ${idCarrito} no encontrados`))
    try {carrito[0].productos.forEach(function(elementoCarrito, i) {
        productos.forEach(function(elementoProducto, j){
            if (elementoCarrito.id==elementoProducto.id){
                if(elementoProducto.stock>=elementoCarrito.cantidad) {
                    elementoProducto.stock=elementoProducto.stock-elementoCarrito.cantidad
                    newProductos.push(elementoProducto)
                }
                else {
                    return error
                }
            }
        })
    })
    }catch(e){
        return done (new customError (500,`Stock insuficiente`))
    }
    newProductos.forEach(e => a.update(e.id,e))
    return done (null,"Stock OK")
}

async function deleteOrden(id,done){
    let orden=await c.getById(id)
    if(!orden.length) return done (new customError (404,`Orden id: ${id} no encontrado`))
    else {
        const deleteId=await c.deleteById(id)
        if (deleteId.estado ) return done (new customError (deleteId.estado,deleteId.descripcion))
        else return done (null,id)
    }
}

export {getOrden,getOrdenByEmail,setOrden,deleteOrden}