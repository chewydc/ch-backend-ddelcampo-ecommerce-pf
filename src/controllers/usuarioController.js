//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import passport from 'passport'
import { Strategy as localStrategy } from 'passport-local'
import { UsuariosDao as d } from '../daos/index.js'
import { ExtractJwt } from 'passport-jwt';
import { Strategy as JWTstrategy } from 'passport-jwt'
import bcrypt from 'bcrypt';
import customError from '../errores/customError.js'
import {default as config} from '../config.js'
import jwt from 'jsonwebtoken'

import { createTransport } from "nodemailer";
import logger from '../logs/logger.js';
const email= config.adminAccount.mail
const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: email,
        pass: config.adminAccount.pass
    }
});

const sessionkey = config.server.sessionkey
const sessiontime = config.server.sessiontime
const avatarDefaultUsuario= config.server.avatarDefaultUsuario
const avatarDefaultAdmin=config.server.avatarDefaultUsuario

passport.use(
    'register',
    new localStrategy(
        {   
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            if (!email){
                return done(new customError(400, `Error en el proceso de registracion del usuario. Campo "email" faltante o erroneo.`))
            }            
            if (!password){
                return done(new customError(400, `Error en el proceso de registracion del usuario. Campo "password" faltante o erroneo.`))
            }            
            if (!req.body.passwordConfirm){
                return done(new customError(400, `Error en el proceso de registracion del usuario. Campo "passwordConfirm" faltante o erroneo.`))
            }            
            if (!req.body.nombre){
                return done(new customError(400, `Error en el proceso de registracion del usuario. Campo "nombre" faltante o erroneo.`))
            }  
            if (!req.body.telefono){
                return done(new customError(400, `Error en el proceso de registracion del usuario. Campo "telefono" faltante o erroneo.`))
            }  
            if (!req.body.direccion){
                return done(new customError(400, `Error en el proceso de registracion del usuario. Campo "direccion" faltante o erroneo.`))
            }  
            if (password!=req.body.passwordConfirm){
                return done(new customError(400, `Error en el proceso de registracion del usuario. Las contraseñas ingresadas no coinciden`))
            }            
            const user = await d.getByEmail(email)
            if (user.length) {
                return done(new customError(400, `Error en el proceso de registracion del usuario. El email ${email} ya existe.`))
            }
            let admin = false
            let avatar = avatarDefaultUsuario
            if (req.body.admin) {
                admin = req.body.admin
                avatar= avatarDefaultAdmin
            }
            if (req.body.avatar) avatar= req.body.avatar
            const hash = await bcrypt.hash(password, 10);
            const newUser = {email: email, telefono: req.body.telefono, avatar: avatar, nombre: req.body.nombre,admin,direccion: req.body.direccion, password: hash }
            const userId = await d.save(newUser)
            if (userId.estado) return done(new customError(userId.estado, userId.descripcion,userId.detalles))
            let enviomail = sendConfirmRegisterEmail(userId,newUser, function (err, result) {
                if (err) return (new customError(err.estado, err.descripcion))
                else return result
            })
            if (enviomail.estado) { return done(new customError(enviomail.estado, enviomail.descripcion)) }
            else return done(null,{userId});
        }
))

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await d.getByEmail(email)
                if (!user.length) {
                    return done(new customError(404, `Inconvenientes en el logueo. Usuario no encontrado`))
                }
                if (user.estado) {
                    return done(new customError(user.estado, `${user.descripcion}. ${user.detalles}`))
                }
                if (await isValidPassword(password, user[0].password)) {
                    return done(null, user[0], { message: 'Logueado correctamente' })
                }
                return done(new customError(403, `Inconvenientes en el logueo. Password incorrecta`))
            }
            catch (error) {
                return done(new customError(500, `Error en el proceso de logueo del usuario`, error))
            }
        }
    )
);


passport.use(
    new JWTstrategy(
        {
            secretOrKey: sessionkey,
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(new customError(401, `Error en el proceso de autorizacion del usuario`, error))

            }
        }
    )
);

async function isValidPassword(passwordA, passwordB) {
    const compare = await bcrypt.compare(passwordA, passwordB)
    return compare
}

function createToken(data){
	return jwt.sign({user: data},sessionkey,{expiresIn: sessiontime});
}
async function updateUsuario(id,n,t,e,dir,a,f,done){
    if ( !id || !n || !t || !e || !dir || !a || !f ) return done (new customError (400,`Falla al actualizar el usuario. Campo faltante`))
    const time = new Date()
    const nuevoUsuario = {nombre:n,telefono:t,email:e,direccion:dir,admin:a,avatar:f, timestamp: time.toLocaleString() }
    const userUpdated=await d.update(id,nuevoUsuario)
    if (userUpdated.estado) return done (new customError (userUpdated.estado,userUpdated.descripcion))
    else return done (null, userUpdated)
}


async function sendConfirmRegisterEmail(userId,user,done) {
    try {
        transporter.sendMail({
            from: 'confirmacion_registro@ecommerce.nodejs',
            to: email,
            subject: `Alta de usuario: ${user.email}`,
            html: `DATOS:
        ID: ${userId},
        Nombre: ${user.nombre}
        Telefono: ${user.telefono},
        Direccion: ${user.direccion},
        ¿Es Admin?: ${user.admin},
        Avatar: ${user.avatar}
    `})
        logger.info(`Mail de confirmacion de registro ${user.email} enviado OK`)
        return done(null, `Mail de confirmacion de registro: ${user.email} enviado OK`)
    } catch (error) {
        logger.error(error)
        return done(new customError(500, `Error en el envio de mail de registro`))
    }
}

export {createToken,isValidPassword,updateUsuario}