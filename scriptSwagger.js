import postToYaml from 'post-collection-to-yaml';
import path from 'path'
const __dirname = path.resolve();
import {default as config} from './src/config.js'


const fileIn = './CoderHouse.postman_collection';
const fileOut = './swagger.yaml';
let puerto= config.server.port

const options = {
    url: `http://localhost:${puerto}/`,
    title: 'Entrega Final ddelcampo - Curso Backend CoderHouse',
    version: '1.0.1',
    descriptionInfo: 'APIs Documentation Swagger - Entrega Final ddelcampo',
    email: 'ddelcampo@teco.com.ar'
}

const stringInput = path.join(__dirname, fileIn);
const stringOutput = path.join(__dirname, fileOut);
await postToYaml.convert(stringInput, stringOutput, options);