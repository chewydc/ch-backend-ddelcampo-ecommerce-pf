//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import mongoose from 'mongoose';

const modelMensaje = new mongoose.Schema({
    email: {type: String, required: true},
    tipo: {type: String, required: true},
    cuerpo: {type: String, required: true},
    avatar: {type: String, required: false},
    timestamp: {type: String, required: true},
    id: {type: Number, required: true, unique: true}
})


export default modelMensaje;