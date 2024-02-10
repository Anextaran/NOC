import { ServerResponse } from "http";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";
import 'dotenv/config'
import { PrismaClient } from "@prisma/client";

(async () => {
    await main();
})();

async function main() {


    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // const prisma = new PrismaClient();

    // * CREAR COLECCION EN PostgreSQL con Prisma
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level:'HIGH',
    //         message: 'test-message from prisma',
    //         origin: 'App.ts'
    //     }
    // });
    // console.log({newLog});
    
    // // ? Todos los logs
    // // const logs = await prisma.logModel.findMany();
    
    // // ? Solo los que ...
    // const logs = await prisma.logModel.findMany({

    //     where:{
    //         level: 'MEDIUM'
    //     }
    // });

    // console.log(logs);

    // // * CREAR COLECCION EN MONGODB CON MONGOOOSE
    // const newLog = await LogModel.create({
    //     message: 'Test message from Mongo',
    //     origin: 'App.ts',
    //     level: 'low',
    // });

    Server.start();

    // // Obtiene los datos de la base de datos mongo
    // const logs = await LogModel.find();
    // console.log(logs);
    // // Solo el nombre del primero
    // console.log(logs[0].message);

} 