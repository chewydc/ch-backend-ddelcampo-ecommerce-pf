//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import fs from "fs"
import logger from '../logs/logger.js'
import customError from '../errores/customError.js'


class ContenedorArchivo {
  constructor(path) {
    this.path = path;
  }

  async save(elemento) {
    try {
      let elementos = await this.getAll();
      const array = elementos.map((x) => x.id);
      if (array.length == 0) {
        elemento.id = 1;
      } else {
        elemento.id = Math.max(...array) + 1;
      }
      elementos.push(elemento);
      elementos = JSON.stringify(elementos, null, 2);
      await fs.promises.writeFile(this.path, elementos);
      return elemento.id;
    } catch (error) {
      this.MuestroError(error, "save")
      return new customError(500, 'Error al intentar guardar elemento', error)
    }
  }
  async getAll() {
    try {
      let contenido = await fs.readFileSync(this.path, this.encoding);
      if (contenido == "") return []
      return JSON.parse(contenido)
    } catch (error) {
      this.MuestroError(error, "getAll");
      return new customError(500, 'Error al obtener todos los elementos', error)
    }
  }

  async getById(number) {
    try {
      const a = await this.getAll();
      let filtrado = a.filter((a) => a.id == number);
      if (!filtrado) filtrado = [];
      return filtrado;
    } catch (error) {
      this.MuestroError(error, "getById");
      return new customError(500, `Error en conseguir el id: ${number}`, error)
    }
  }

  async getByEmail(email) {
    try {
      const a = await this.getAll();
      let filtrado = a.filter((a) => a.email == email);
      if (!filtrado) filtrado = [];
      return filtrado;
    } catch (error) {
      this.MuestroError(error, "getByEmail");
      return new customError(500, `Error en conseguir el email: ${email}`, error)
    }
  }

  async update(number, elem) {
    try {
      const elementos = await this.getAll()
      const index = elementos.findIndex(o => o.id == number)
      if (index == -1) return new customError(404,`Error al actualizar id ${number}: elemento no encontrado`)
      else {
        elementos[index] = { ...elem, id: Number(number) }
        await fs.promises.writeFile(this.path, JSON.stringify(elementos, null, 2));
        return await this.getById(number)
      }
    } catch (error) {
      this.MuestroError(error, "update")
      return new customError(500, `Error actualizando el elemento id: ${number}`, error)
    }
  }




  async deleteById(number) {
    try {
      const a = await this.getAll();
      let b = a.filter((a) => a.id != number);
      if (b.length == 0) await fs.promises.writeFile(this.path, "");
      else {
        b = JSON.stringify(b, null, 2);
        await fs.promises.writeFile(this.path, b);
      }
      logger.info(`Borrado id: ${number} ok!`);
      return []
    } catch (error) {
      this.MuestroError(error, "deleteById")
      return new customError(500, `Error en eliminar el id: ${number}`, error)
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "");
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

export default ContenedorArchivo