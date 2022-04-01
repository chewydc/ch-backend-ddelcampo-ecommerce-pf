//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'

class MensajesDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('mensajes')
    }
}

export default MensajesDaoFirebase