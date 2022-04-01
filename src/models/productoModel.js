//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import mongoose from 'mongoose';

const modelProducto = new mongoose.Schema({
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    categoria: {type: String, required: true},
    stock: {type: Number, required: true},
    foto: {type: String, required: true},
    timestamp: {type: String, required: true},
    id: {type: Number, required: true, unique: true}
})


export default modelProducto;