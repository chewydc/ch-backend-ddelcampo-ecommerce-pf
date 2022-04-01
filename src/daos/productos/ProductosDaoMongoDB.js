//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js'
import modelProducto from '../../models/productoModel.js';

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super("productos", modelProducto)
    }
}

export default ProductosDaoMongoDB