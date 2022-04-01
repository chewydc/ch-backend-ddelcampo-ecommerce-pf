//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js'
import modelMensaje from '../../models/mensajeModel.js';

class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super('mensajes', modelMensaje)    
    }
}

export default MensajesDaoMongoDB