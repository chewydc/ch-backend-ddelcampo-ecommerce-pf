//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import config from '../config.js'
import logger from '../logs/logger.js';

let CarritoDao
switch (config.server.persistenciaCart) {
    case 'file':
        const { default: CarritoDaoArchivo } = await import('./carritos/CarritoDaoArchivo.js')
        logger.info("Carrito persistirá en archivo local")
        CarritoDao = new CarritoDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: CarritoDaoFirebase } = await import('./carritos/CarritoDaoFirebase.js')
        logger.info("Carrito persistirá en firebase")
        CarritoDao = new CarritoDaoFirebase()
        break
    case 'mongodb':
        const { default: CarritoDaoMongoDb } = await import('./carritos/CarritoDaoMongoDb.js')
        logger.info("Carrito persistirá en mongoDB")
        CarritoDao = new CarritoDaoMongoDb()
        break
    default:
        const { default: CarritoDaoMemoria } = await import('./carritos/CarritoDaoMemoria.js')
        logger.info("Carrito persistirá en memoria")
        CarritoDao = new CarritoDaoMemoria()
        break
        
}

let ProductosDao

switch (config.server.persistenciaProd) {
    case 'file':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        logger.info("Productos persistirá en arhivo local")
        ProductosDao = new ProductosDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        logger.info("Productos persistirá en firebase")
        ProductosDao = new ProductosDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDB } = await import('./productos/ProductosDaoMongoDb.js')
        logger.info("Productos persistirá en mongoDB")
        ProductosDao = new ProductosDaoMongoDB()
        break
    default:
        const { default: ProductosDaoMemoria } = await import('./productos/ProductosDaoMemoria.js')
        logger.info("Productos persistirá en memoria")
        ProductosDao = new ProductosDaoMemoria()
        break
}

let OrdenesDao

switch (config.server.persistenciaOrd) {
    case 'file':
        const { default: OrdenesDaoArchivo } = await import('./ordenes/OrdenesDaoArchivo.js')
        logger.info("Ordenes persistirá en arhivo local")
        OrdenesDao = new OrdenesDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: OrdenesDaoFirebase } = await import('./ordenes/OrdenesDaoFirebase.js')
        logger.info("Ordenes persistirá en firebase")
        OrdenesDao = new OrdenesDaoFirebase()
        break
    case 'mongodb':
        const { default: OrdenesDaoMongoDB } = await import('./ordenes/OrdenesDaoMongoDb.js')
        logger.info("Ordenes persistirá en mongoDB")
        OrdenesDao = new OrdenesDaoMongoDB()
        break
    default:
        const { default: OrdenesDaoMemoria } = await import('./ordenes/OrdenesDaoMemoria.js')
        logger.info("Ordenes persistirá en memoria")
        OrdenesDao = new OrdenesDaoMemoria()
        break
}

let UsuariosDao

switch (config.server.persistenciaUser) {
    case 'file':
        const { default: UsuariosDaoArchivo } = await import('./usuarios/UsuariosDaoArchivo.js')
        logger.info("Usuarios persistirá en arhivo local")
        UsuariosDao = new UsuariosDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: UsuariosDaoFirebase } = await import('./usuarios/UsuariosDaoFirebase.js')
        logger.info("Usuarios persistirá en firebase")
        UsuariosDao = new UsuariosDaoFirebase()
        break
    case 'mongodb':
        const { default: UsuariosDaoMongoDB } = await import('./usuarios/UsuariosDaoMongoDb.js')
        logger.info("Usuarios persistirá en mongoDB")
        UsuariosDao = new UsuariosDaoMongoDB()
        break
    default:
        const { default: UsuariosDaoMemoria } = await import('./usuarios/UsuariosDaoMemoria.js')
        logger.info("Usuarios persistirá en memoria")
        UsuariosDao = new UsuariosDaoMemoria()
        break
}

let MensajesDao

switch (config.server.persistenciaMensaje) {
    case 'file':
        const { default: MensajesDaoArchivo } = await import('./mensajes/MensajesDaoArchivo.js')
        logger.info("Mensajes persistirá en arhivo local")
        MensajesDao = new MensajesDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: MensajesDaoFirebase } = await import('./mensajes/MensajesDaoFirebase.js')
        logger.info("Mensajes persistirá en firebase")
        MensajesDao = new MensajesDaoFirebase()
        break
    case 'mongodb':
        const { default: MensajesDaoMongoDB } = await import('./mensajes/MensajesDaoMongoDb.js')
        logger.info("Mensajes persistirá en mongoDB")
        MensajesDao = new MensajesDaoMongoDB()
        break
    default:
        const { default: MensajesDaoMemoria } = await import('./mensajes/MensajesDaoMemoria.js')
        logger.info("Mensajes persistirá en memoria")
        MensajesDao = new MensajesDaoMemoria()
        break
}

export { ProductosDao,CarritoDao,OrdenesDao,UsuariosDao,MensajesDao }