import {config} from 'dotenv'

// Este archivo sirve para cambiar el archivo ".env" al ".env.test"
// cuando se ejecuten los testeos.

// Configurese en "jest.config.ts", en la parte "setupFiles"
// y agreguese como:  "<rootDir>/setupTest.ts".

config({
    path: '.env.test'
})