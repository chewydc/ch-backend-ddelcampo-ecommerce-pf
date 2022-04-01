//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('productos')
    }
}

export default ProductosDaoFirebase