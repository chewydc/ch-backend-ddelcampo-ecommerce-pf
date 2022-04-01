//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import mongoose from 'mongoose';

const modelUsuarios = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nombre: {type: String, required: true},
    telefono: {type: String, required: true},
    direccion: {type: String, required: true},
    avatar: {type: String, required: true},
    admin: {type: Boolean, required: true},
    id: {type: Number, required: true, unique: true}
})

modelUsuarios.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

export default modelUsuarios;