//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js'
import modelUsuarios from '../../models/usuariosModel.js';

class UsuariosDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super('usuarios', modelUsuarios)    
    }
}

export default UsuariosDaoMongoDB