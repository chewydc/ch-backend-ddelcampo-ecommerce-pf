//-------------------------------------------------------------------
// PROYECTO FINAL
// Fecha Tope Entrega: 04-04-22// Alumno: Damian del Campo
//-------------------------------------------------------------------
import { Router } from 'express'
const apiInfo = new Router()
import os from 'os'

apiInfo.get('/', (req, res) => {
    res.json(
        {
            Arg: process.argv.slice(2),
            SO: process.platform,
            Node: process.version,
            Memoria: process.memoryUsage().rss,
            execPath: process.execPath,
            PID: process.pid,
            ProjectFolder: process.cwd(),
            NroSrv: os.cpus().length
        }
    );
})

apiInfo.get('*', (req, res) => {
    const { url, method } = req
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})
export {apiInfo}