//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js'
import {default as config} from '../../config.js'

class OrdenesDaoArchivo extends ContenedorArchivo {
    constructor(){
        super(`${config.fileSystem.path}/ordenes.json`)
    }
}

export default OrdenesDaoArchivo