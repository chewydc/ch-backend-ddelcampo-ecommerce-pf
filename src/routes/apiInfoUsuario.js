//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
import {updateUsuario} from '../controllers/usuarioController.js'

const apiInfoUsuario= new Router()


apiInfoUsuario.get(
  '/profile',
  (req, res, next) => {
    res.json({
      user: req.user,
      token: req.query.secret_token
    })
  }
);

apiInfoUsuario.put('/profile/:id', async (req,res)=> {
  updateUsuario(req.params.id,req.body.nombre,req.body.telefono,req.body.email,req.body.direccion,req.body.admin,req.body.avatar,function (err,result){
      if (err) res.status(err.estado).json(err.descripcion)
      else res.json(result)    
      })
})

export {apiInfoUsuario};
