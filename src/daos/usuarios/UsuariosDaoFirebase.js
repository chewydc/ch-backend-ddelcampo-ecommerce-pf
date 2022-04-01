//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'

class UsuariosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('usuarios')
    }
}

export default UsuariosDaoFirebase