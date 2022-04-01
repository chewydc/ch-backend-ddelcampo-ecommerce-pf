# ch-backend-ddelcampo-ecommerce-pf 
Proyecto Final Ecommerce - Curso Backend de CoderHouse 


## 🚀Instalacion
1. Clona este proyecto desde `https://github.com/chewydc/ch-backend-ddelcampo-ecommerce-pf` 
2. Ve a la carpeta del proyecto `cd ch-backend-ddelcampo-ecommerce-pf`
3. Instala las dependencias `npm i`
4. Corre en ambiente local `npm start`

## 📁 Heroku 
`https://ch-ecommerce-ddelcampo.herokuapp.com/`

## 💻 Parametros de Lanzamiento
El proyecto admite recibir variables por consola al momento de su lanzamiento, o bien definirlas en un archivo .env (se adjunta un archivo .env.example como ejemplo del formato). De no econtrarse el mismo, en el archivo /src/config.js tambien se pueden setear valores por defecto para un correcto funcionamiento en general.

Via consola permite:
--modo= permite cambiar el modo cluster y fork (default fork)
--puerto= permite cambiar el puerto (default 8080)

## 💾 Persistencia
Este proyecto admite:
2 bases de datos (MongoDB y Firebase), ficheros locales (ubicados en el path /DB) y alojando en memoria.
Estas opciones son administrables desde el archivo .env, etiquetas:
CARRITOS_PERSIST=mongodb/firebase/file (default en mongo, por error aloja en memoria)
PRODUCTOS_PERSIST
ORDENES_PERSIST
USUARIOS_PERSIST
MENSAJES_PERSIST

## 📙 Swagger
Se implemento un Swagger como parte de la documentacion de las APIs. Tambien nos sirvio para testear las mismas con postman. El swagger se encuentra en : `/api-docs`

## 📒 JWT
Se implemento JSON Web Token en todos los metodos para la autenticacion e integridad de la comunicacion entre el front y el back. Dentro del JWT se incorporo el usuario que se logea y se decodifica en el back para trabajar con los datos del usuario. Las rutas detalladas pueden encontrarse en el Swagger con algunos ejemplos de ejecucion. El token tiene un tiempo de expiracion configuracion bajo el tag sessiontime.

## 👉🏻 Dependencias
 * bcrypt
 * body-parser
 * dotenv
 * express
 * firebase-admin
 * jsonwebtoken
 * minimist
 * mongoose
 * nodemailer
 * passport
 * passport-jwt
 * passport-local
 * pino-multi-stream
 * pino-pretty
 * post-collection-to-yaml
 * socket.io
 * swagger-ui-express
 * yamljs    


