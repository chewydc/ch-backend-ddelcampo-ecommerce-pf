//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import admin from 'firebase-admin'
import { default as config } from '../config.js'
import logger from '../logs/logger.js'
import customError from '../errores/customError.js'


admin.initializeApp({
  credential: admin.credential.cert(config.firebase.serviceAccount),
  databaseURL: config.firebase.url
})

class ContenedorFirebase {

  constructor(nombreColeccion) {
    this.coleccion = admin.firestore().collection(nombreColeccion)
  }

  async save(elem) {
    try {
      let elementos = await this.coleccion.orderBy("id").get()
      let newId
      if (elementos.docs.length == 0) newId = 1
      else {
        newId = elementos.docs[elementos.docs.length - 1].id
        newId++
      }
      const newElem = { ...elem, id: newId }
      const prodm = this.coleccion.doc(`${newId}`)
      await prodm.create(newElem)
      return newElem.id
    } catch (error) {
      this.MuestroError(error, "save")
      return new customError(500, 'Error al intentar guardar elemento', error)
    }
  }

  async getAll() {
    try {
      let elem = []
      let elementos = await this.coleccion.orderBy("id").get()
      if (elementos.docs.length > 0) {
        for (const elemento of elementos.docs) {
          elem.push(elemento.data())
        }
      }
      return elem
    } catch (error) {
      this.MuestroError(error, "getAll")
      return new customError(500, 'Error al obtener todos los elementos', error)
    }
  }

  async getById(number) {
    try {
      const doc = this.coleccion.doc(`${number}`)
      const item = await doc.get()
      const response = []
      if (item.data()) response.push(item.data())
      return response
    } catch (error) {
      this.MuestroError(error, "getById")
      return new customError(500, `Error en conseguir el id: ${number}`, error)
    }
  }

  async getByEmail(email) {
    try {
      const doc = this.coleccion.doc(`${email}`)
      const item = await doc.get()
      const response = []
      if (item.data()) response.push(item.data())
      return response
    } catch (error) {
      this.MuestroError(error, "getByEmail")
      return new customError(500, `Error en conseguir el email: ${email}`, error)
    }
  }

  async update(number, elem) {
    try {
      const doc = this.coleccion.doc(`${number}`)
      await doc.update(elem)
      logger.info(`Update id: ${number} ok!`);
      return this.getById(number)
    } catch (error) {
      this.MuestroError(error, "update")
      return new customError(500, `Error actualizando el elemento id: ${number}`, error)
    }
  }

  async deleteById(number) {
    try {
      const doc = this.coleccion.doc(`${number}`)
      await doc.delete()
      logger.info(`Borrado id: ${number} ok!`);
      return []
    } catch (error) {
      this.MuestroError(error, "deleteById")
      return new customError(500, `Error en eliminar el id: ${number}`, error)
    }
  }

  async deleteAll() {
    try {
      const elementos = await this.getAll()
      if (elementos.length > 0) {
        for (const elemento of elementos) {
          this.deleteById(elemento.id)
        }
      }
      logger.info("Borrado Completo ok!");
      return []
    } catch (error) {
      this.MuestroError(error, "deleteAll")
      return new customError(500, `Error eliminando los elementos`, error)
    }
  }

  MuestroError(error, fnName) {
    logger.error(`#!% --> Error en funcion ${fnName}:\n#!% --> ${error}`);
  }
}

export default ContenedorFirebase