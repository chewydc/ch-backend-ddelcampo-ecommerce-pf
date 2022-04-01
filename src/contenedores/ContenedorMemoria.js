//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import logger from '../logs/logger.js'
import customError from '../errores/customError.js'

class ContenedorMemoria {

    constructor() {
        this.elemento = []
    }

    async save(elem) {
        try {
            let newId
            if (this.elemento.length == 0) {
                newId = 1
            } else {
                newId = this.elemento[this.elemento.length - 1].id + 1
            }
            const newElem = { ...elem, id: newId }
            this.elemento.push(newElem)
            return newElem.id
        } catch (error) {
            this.MuestroError(error, "save")
            return new customError(500, 'Error al intentar guardar elemento', error)
        }
    }

    async getAll() {
        try {
            let contenido = [...this.elemento]
            if (!contenido) contenido = []
            return contenido
        } catch (error) {
            this.MuestroError(error, "getAll")
            return new customError(500, 'Error al obtener todos los elementos', error)
        }
    }

    async getById(number) {
        try {
            let filtrado = this.elemento.filter((a) => a.id == number);
            if (!filtrado) filtrado = []
            return filtrado
        } catch (error) {
            this.MuestroError(error, "getById");
            return new customError(500, `Error en conseguir el elemento id: ${number}`, error)
        }
    }
    
    async getByEmail(email) {
        try {
            let filtrado = this.elemento.filter((a) => a.email == email);
            if (!filtrado) filtrado = []
            return filtrado
        } catch (error) {
            this.MuestroError(error, "getByEmail");
            return new customError(500, `Error en conseguir el elemento email: ${email}`, error)
        }
    }

    async update(number, elem) {
        try {
            const index = this.elemento.findIndex(p => p.id == number)
            if (index == -1) return new customError(404, `Error al actualizar id ${number}: elemento no encontrado`)
            else {
                this.elemento[index] = { ...elem, id: Number(number) }
                return await this.getById(number)
            }
        } catch (error) {
            this.MuestroError(error, "update")
            return new customError(500, `Error actualizando el elemento id: ${number}`, error)
        }
    }

    async deleteById(number) {
        try {
            const index = this.elemento.findIndex(elem => elem.id == number)
            if (index == -1) {
                return new customError(404, `Elemento id ${number} no encontrado`)
            } else {
                this.elemento.splice(index, 1)[0]
                logger.info(`Borrado id: ${number} ok!`)
                return []
            }
        } catch (error) {
            this.MuestroError(error, "deleteById")
            return new customError(500, `Error en eliminar el id: ${number}`, error)
        }
    }

    async deleteAll() {
        try {
            this.elemento = []
            logger.info("Borrado Completo ok!");
            return []
        } catch (error) {
            this.MuestroError(error, "deleteAll");
            return new customError(500, `Error eliminando los elementos`, error)
        }
    }

    MuestroError(error, fnName) {
        logger.error(`#!% --> Error en funcion ${fnName}:\n#!% --> ${error}`);
    }
}

export default ContenedorMemoria