//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js'
import modelCarrito from '../../models/carritoModel.js';

class CarritoDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super('carritos', modelCarrito)    
    }
}

export default CarritoDaoMongoDB