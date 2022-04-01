//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'

class OrdenesDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('ordenes')
    }
}

export default OrdenesDaoFirebase