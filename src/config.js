//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.resolve('./.env')})

let configAmbiente =[]
if (process.env.NODE_ENV === "produccion" || process.env.NODE_ENV === "prod") {
    configAmbiente = {
        fileSystem: {
            path: process.env.PROD_PATH_LOCAL_FS || 'DB'
        },
        mongodb: {
            url: process.env.PROD_MONGO_URL || 'mongodb+srv://USER:PASS@HOST.mongodb.net/DB_DEV',
            options: {
                serverSelectionTimeoutMS: process.env.PROD_MONGO_TO || 5000
            }
        },
        server: {
            port: process.env.PROD_SERVER_PORT || 8080,
            modo: process.env.PROD_SERVER_MODO || 'FORK',
            sessionkey: process.env.PROD_SESSION_SECRET_KEY || 'KEY',
            sessiontime: process.env.PROD_EXPIRACION || '60000s',
            persistenciaCart: process.env.PROD_CARRITOS_PERSIST || 'mongodb',
            persistenciaProd: process.env.PROD_PRODUCTOS_PERSIST || 'mongodb',
            persistenciaOrd: process.env.PROD_ORDENES_PERSIST || 'mongodb',
            persistenciaUser: process.env.PROD_USUARIOS_PERSIST || 'mongodb',
            persistenciaMensaje: process.env.PROD_MENSAJES_PERSIST || 'mongodb',
            avatarDefaultUsuario: process.env.PROD_AVATAR_USER || 'https://cdn0.iconfinder.com/data/icons/ecommerce-essential-material-1/32/Artboard_16-128.png',
            avatarDefaultAdmin: process.env.PROD_AVATAR_ADMIN || 'https://cdn4.iconfinder.com/data/icons/web-icons-22/48/store-128.png'            
        },
        firebase: {
            serviceAccount: {
                "type": process.env.PROD_FIREBASE_TYPE ||"service_account",
                "project_id": process.env.PROD_FIREBASE_PROJECT_ID ||"basefirebase-XXX",
                "private_key_id": process.PROD_FIREBASE_PRIVATE_KEY_ID || "XXX",
                "private_key": process.env.PROD_FIREBASE_PRIVATE_KEY || "XXX\n-----END PRIVATE KEY-----\n",
                "client_email": process.env.PROD_FIREBASE_CLIENT_EMAIL || "XXX@appspot.gserviceaccount.com",
                "client_id": process.env.PROD_FIREBASE_CLIENT_ID || "XXX",
                "auth_uri": process.env.PROD_FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
                "token_uri": process.env.PROD_FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": process.env.PROD_FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": process.env.PROD_FIREBASE_AUTH_CLIENT_X509_CERT_URL || "https://www.googleapis.com/robot/v1/metadata/x509/basefirebase-XXX%40appspot.gserviceaccount.com"
              },
            url: process.env.PROD_FIREBASE_URL || "https://basefirebase-XXX.firebaseio.com"
        },
        adminAccount: {
            "mail": process.env.PROD_ADMIN_MAIL || 'XXX@ethereal.email',
            "pass": process.env.PROD_ADMIN_MAIL_PASS || 'XXX',
            "accountSid": process.env.PROD_ADMIN_ACCOUNT_SID || 'XXX',
            "authToken": process.env.PROD_ADMIN_AUTH_TOKEN || 'XXX',
        }
    }
} 
else {
    configAmbiente= {
        fileSystem: {
            path: process.env.DEV_PATH_LOCAL_FS || 'DB'
        },
        mongodb: {
            url: process.env.DEV_MONGO_URL || 'mongodb+srv://USER:PASS@HOST.mongodb.net/DB_PROD',
            options: {
                serverSelectionTimeoutMS: process.env.DEV_MONGO_TO || 5000
            }
        },
        server: {
            port: process.env.DEV_SERVER_PORT || 8080,
            modo: process.env.DEV_SERVER_MODO || 'FORK',
            sessionkey: process.env.DEV_SESSION_SECRET_KEY || 'KEY',
            sessiontime: process.env.DEV_EXPIRACION || '60000s',
            persistenciaCart: process.env.DEV_CARRITOS_PERSIST || 'mongodb',
            persistenciaProd: process.env.DEV_PRODUCTOS_PERSIST || 'mongodb',
            persistenciaOrd: process.env.DEV_ORDENES_PERSIST || 'mongodb',
            persistenciaUser: process.env.DEV_USUARIOS_PERSIST || 'mongodb',
            persistenciaMensaje: process.env.DEV_MENSAJES_PERSIST || 'mongodb',
            avatarDefaultUsuario: process.env.DEV_AVATAR_USER || 'https://cdn0.iconfinder.com/data/icons/ecommerce-essential-material-1/32/Artboard_16-128.png',
            avatarDefaultAdmin: process.env.DEV_AVATAR_ADMIN || 'https://cdn4.iconfinder.com/data/icons/web-icons-22/48/store-128.png'            
        },
        firebase: {
            serviceAccount: {
                "type": process.env.DEV_FIREBASE_TYPE ||"service_account",
                "project_id": process.env.DEV_FIREBASE_PROJECT_ID ||"basefirebase-XXX",
                "private_key_id": process.DEV_FIREBASE_PRIVATE_KEY_ID || "XXX",
                "private_key": process.env.DEV_FIREBASE_PRIVATE_KEY || "XXX\n-----END PRIVATE KEY-----\n",
                "client_email": process.env.DEV_FIREBASE_CLIENT_EMAIL || "XXX@appspot.gserviceaccount.com",
                "client_id": process.env.DEV_FIREBASE_CLIENT_ID || "XXX",
                "auth_uri": process.env.DEV_FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
                "token_uri": process.env.DEV_FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": process.env.DEV_FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": process.env.DEV_FIREBASE_AUTH_CLIENT_X509_CERT_URL || "https://www.googleapis.com/robot/v1/metadata/x509/basefirebase-XXX%40appspot.gserviceaccount.com"
              },
            url: process.env.DEV_FIREBASE_URL || "https://basefirebase-XXX.firebaseio.com"
        },
        adminAccount: {
            "mail": process.env.DEV_ADMIN_MAIL || 'XXX@ethereal.email',
            "pass": process.env.DEV_ADMIN_MAIL_PASS || 'XXX',
            "accountSid": process.env.DEV_ADMIN_ACCOUNT_SID || 'XXX',
            "authToken": process.env.DEV_ADMIN_AUTH_TOKEN || 'XXX',
        }
    }
}


export default configAmbiente
