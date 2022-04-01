//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import mongoose from 'mongoose';

const modelOrden = new mongoose.Schema({
    items: {type: Array, required: true},
    email: {type: String, required: true},
    direccion: {type: String, required: true},
    estado: {type: String, required: true},
    timestamp: {type: String, required: true},
    id: {type: Number, required: true, unique: true}
})

export default modelOrden;