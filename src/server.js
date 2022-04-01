//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import cluster from 'cluster'
import os from 'os'
import logger from './logs/logger.js';
import {default as config} from './config.js'
import passport from 'passport'
import './controllers/usuarioController.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//----------------------------------------------------------
// Documantacion APIs
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
const swaggerDocument = YAML.load(path.resolve(`./swagger.yaml`));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//-------------------------------------------------------------------
//Declaro Routers a utilizar
import {apiProductos} from "./routes/apiProductos.js"
import {apiCarrito} from "./routes/apiCarrito.js"
import {apiOrdenes} from "./routes/apiOrdenes.js"
import {apiMensajes} from "./routes/apiMensajes.js"
import {apiUsuario} from "./routes/apiUsuario.js"
import {apiInfo} from "./routes/apiInfo.js"

import {apiInfoUsuario} from "./routes/apiInfoUsuario.js"
import {routerLogin} from "./routes/routerLogin.js"
import {routerRegister} from "./routes/routerRegister.js"
import {routerHome} from "./routes/routerHome.js"
import {routerChat} from "./routes/routerChat.js"
import {routerInfo} from "./routes/routerInfo.js"

app.use('/api/productos',passport.authenticate('jwt', { session: false }),apiProductos)
app.use('/api/carrito',passport.authenticate('jwt', { session: false }),apiCarrito)
app.use('/api/ordenes',passport.authenticate('jwt', { session: false }),apiOrdenes)
app.use('/api/chat',passport.authenticate('jwt', { session: false }),apiMensajes)
app.use('/api/info',passport.authenticate('jwt', { session: false }),apiInfo)
app.use('/user', passport.authenticate('jwt', { session: false }), apiInfoUsuario);
app.use('/api/usuario', apiUsuario);

//----------------------------------------------------------
// Ruta devuelve info del usuario logueado
app.use('/info', passport.authenticate('jwt', { session: false ,failureRedirect: '/login'}), routerInfo);
app.use('/login', routerLogin);
app.use('/register', routerRegister);
app.use('/chat', passport.authenticate('jwt', { session: false ,failureRedirect: '/login'}),routerChat);
app.use('/',passport.authenticate('jwt', { session: false ,failureRedirect: '/login'}),routerHome)

//-------------------------------------------------------------------
//Manejo de websockets
import {getMensajes,setMensaje} from './controllers/mensajesController.js'

io.on('connection', async socket =>{
  logger.info(`#${socket.id} se conectó`)

  io.sockets.emit('updateMsj', await getMensajes(function (err, result) {return result}))

  socket.on('nuevoMensaje', async data => {
    await setMensaje(data.avatar, data.email, data.tipo, data.cuerpo, async function () {
      io.sockets.emit('updateMsj', await getMensajes(function (err, result) { return result }))
    })
  });

  socket.on('updateProd', (msj) => {
    logger.info(`Server <-- ${msj}`)
    io.sockets.emit('updateProd')
  })
  
  socket.on('updateCarrito', (msj) => {
    logger.info(`Server <-- ${msj}`)
    socket.emit('updateCarrito')
  })

  socket.on('compraCarrito', (msj) => {
    logger.info(`Server <-- ${msj}`)
    socket.emit('compraCarrito')
  })
  
  socket.on('updateUser', (msj) => {
    logger.info(`Server <-- ${msj}`)
    socket.emit('updateUser')
  })
});

//----------------------------------------------------------
// Seteo configuracion ingresado por linea de comando
import parseArgs from 'minimist';
const options = {
    alias: {
        p: 'puerto',
        m: 'modo'
        },
    default: {
        puerto: config.server.port,
        modo: config.server.modo
    }
}
const commandLineArgs = process.argv.slice(2);
const { puerto, modo, _ } = parseArgs(commandLineArgs, options);
logger.info({ puerto, modo, otros: _ });

//----------------------------------------------------------
// Cargo el server
if(modo=='CLUSTER' && !cluster.isWorker) {
  const numCPUs = os.cpus().length
  
  logger.info(`Número de procesadores: ${numCPUs}`)
  logger.info(`PID MASTER ${process.pid}`)

  for(let i=0; i<numCPUs; i++) {
      cluster.fork()
  }

  cluster.on('exit', worker => {
    logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
      cluster.fork()
  })
}

else {
  const server = httpServer.listen(puerto, () => {
    logger.info(`Servidor HTTP escuchando en el puerto ${server.address().port} - PID WORKER ${process.pid}`)
    })
    server.on("error", error => logger.error(`Error en servidor ${error}`))
}