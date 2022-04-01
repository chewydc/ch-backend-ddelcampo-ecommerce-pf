//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import mongoose from 'mongoose'
import { default as config } from '../config.js'
import logger from '../logs/logger.js'
import customError from '../errores/customError.js'

await mongoose.connect(config.mongodb.url, config.mongodb.options)

class ContenedorMongoDB {

  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema)
  }

  async save(elem) {
    try {
      let elementos = await this.coleccion.find()
      let newId
      if (elementos.length == 0) {
        newId = 1
      } else {
        newId = elementos[elementos.length - 1].id + 1
      }
      const newElem = { ...elem, id: newId }
      const contenido = new this.coleccion(newElem)
      await contenido.save()
      return newElem.id;
    } catch (error) {
      this.MuestroError(error, "save")
      return new customError(500, 'Error al intentar guardar elemento', error)
    }
  }

  async getAll() {
    try {
      let contenido = await this.coleccion.find()
      if (!contenido) contenido = []
      return contenido
    } catch (error) {
      this.MuestroError(error, "getAll")
      return new customError(500, 'Error al obtener todos los elementos', error)
    }
  }

  async getById(number) {
    try {
      let elemento = await this.coleccion.find({ id: number })
      if (!elemento) elemento = []
      return elemento
    } catch (error) {
      this.MuestroError(error, "getById")
      return new customError(500, `Error en conseguir el id: ${number}`, error)
    }
  }

  async getByEmail(email) {
    try {
      let elemento = await this.coleccion.find({ email: email })
      if (!elemento) elemento = []
      return elemento
    } catch (error) {
      this.MuestroError(error, "getByEmail")
      return new customError(500, `Error en conseguir el email: ${email}`, error)
    }
  }

  async update(number, elem) {
    try {
      let result =await this.coleccion.findOneAndUpdate({ id: number }, elem, { new: true })
      if (!result) return new customError(404,`Error al actualizar id ${number}: elemento no encontrado`)
      else {
        logger.info(`Update id: ${number} ok!`);
        return result
      }
    } catch (error) {
      this.MuestroError(error, "update")
      return new customError(500, `Error actualizando el elemento id: ${number}`, error)
    }
  }

  async deleteById(number) {
    try {
      await this.coleccion.deleteOne({ id: number })
      logger.info(`Borrado id: ${number} ok!`);
      return []
    } catch (error) {
      this.MuestroError(error, "deleteById")
      return new customError(500, `Error en eliminar el id: ${number}`, error)
    }
  }


  async deleteAll() {
    try {
      await this.coleccion.deleteMany()
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

export default ContenedorMongoDB