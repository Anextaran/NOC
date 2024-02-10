import { envs } from "../config/plugins/envs.plugin";
import { PostgresLogDataSource } from "../domain/datasources/postgres-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.srvice';
import fs from 'fs';

const postgreRepos = new LogRepositoryImpl(
    // new FileSystemDataSource()
    new PostgresLogDataSource()
);

const fsRepost = new LogRepositoryImpl(
    new FileSystemDataSource(),
)

const mongoRepos = new LogRepositoryImpl(
    new MongoLogDataSource(),
)



const emailService = new EmailService();

const Jobs = {

    checkStatus: () => {
        const url = 'http://google.com';
        // const url = 'http://localhost:3000/posts'
        new CheckService(
            postgreRepos, // or mongo or fs
            () => console.log(`${url} is ok`),
            (error) => console.log(error),
        ).execute(url);
    },

    checkStatusMultiple: () => {
        const url = 'http://google.com';
        // const url = 'http://localhost:3000/posts'
        new CheckServiceMultiple(
         [postgreRepos,fsRepost,mongoRepos],
            () => console.log(`${url} is ok`),
            (error) => console.log(error),
        ).execute(url);
    },

    sendEmailJob: () => {
        new SendEmailLogs(emailService, fsRepost)
            .execute('diegorodriguez999x@gmail.com');
    },
}

export class Server {

    public static async start() {

        console.log("SERVER STARTING...");
        CronService.createJob('*/3 * * * * *', Jobs.checkStatusMultiple);
        CronService.createJob('*/3 * * * * *', Jobs.checkStatusMultiple);

        // const logs = await logRepos.getLogs(LogSeverityLevel.medium);
        // console.log(logs);
    }
}