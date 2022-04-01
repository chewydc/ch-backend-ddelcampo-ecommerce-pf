//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js'
import modelOrdenes from '../../models/ordenModel.js';

class OrdenesDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super('ordenes', modelOrdenes)    
    }
}

export default OrdenesDaoMongoDB