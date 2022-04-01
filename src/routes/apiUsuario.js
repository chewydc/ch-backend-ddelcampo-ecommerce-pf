//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import Router from 'express'
import passport from 'passport'
import { createToken } from '../controllers/usuarioController.js'

const apiUsuario = new Router()

apiUsuario.post(
  '/register',
  passport.authenticate('register', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'El usuario se registro con exito',
      userID: req.user
    })
  }
)


apiUsuario.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err) return res.status(err.estado).json(err.descripcion)
          if (!user) return res.status(404).json("Inconvenientes en el logueo. Usuario no encontrado.")
          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error)
              const body = { id: user.id, nombre: user.nombre, email: user.email, admin: user.admin, direccion: user.direccion, telefono: user.telefono, avatar: user.avatar };
              const token = createToken(body)
              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

// Manejo de errores.
apiUsuario.use(function (err, req, res, next) {
  res.status(err.estado || 500);
  res.json({ error: err });
});


// Estrategia de Logueo ruta desconocida
apiUsuario.get('*', (req, res) => {
  const { url, method } = req
  res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})

export { apiUsuario }
