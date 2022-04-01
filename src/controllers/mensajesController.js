//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import {MensajesDao } from '../daos/index.js'
import customError from '../errores/customError.js'

async function getMensajes(done) {
    let msjs=await MensajesDao.getAll()
    if(!msjs.length) return done (new customError (404,`No se encontraron mensajes`))
    if(msjs.estado) return done (new customError (msjs.estado,msjs.descripcion))
    return done (null,msjs)
}

async function getMensajesByEmail(email,done) {
    let msjs=await MensajesDao.getByEmail(email)
    if(!msjs) return done (new customError (404,`No se encontraron mensajes`))
    if(msjs.estado) return done (new customError (msjs.estado,msjs.descripcion))
    return done (null,msjs)
}

async function setMensaje( a,e,t,c,done){
    if (!a|| !e || !t ||!c) return done (new customError (400,`Falla al cargar el msnaje. Campo faltante o erroneo`))
    const time = new Date()
    const nuevoMensaje = {avatar:a,email:e,tipo:t,cuerpo:c, timestamp: time.toLocaleString() }
    const id= await MensajesDao.save(nuevoMensaje)
    if (id.estado) return done (new customError (id.estado,`${id.descripcion}. ${id.detalles}`))
    else return done (null,`Nuevo mensaje ID: ${id} cargado OK!`)
}

async function deleteMensaje(id,done) {
    let msj=await MensajesDao.getById(id)
    if(!msj.length) return done (new customError (404,`Mensaje id: ${id} no encontrado`))
    else {
        let delMsj=await MensajesDao.deleteById(id)
        console.log(delMsj)
        if (delMsj.estado) return done (new customError (404,`Mensaje id: ${id} no encontrado`))
        else return done (null,`Mensaje ID: ${id} eliminado OK!`)
    }

}



export {getMensajes,getMensajesByEmail,setMensaje,deleteMensaje}