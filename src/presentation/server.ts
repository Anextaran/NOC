import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.srvice';
import fs from 'fs';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
    // Here we can change to the system we want
    // whether is postgreSQL, mongoDB or the file system...
);

const emailService = new EmailService();

const Jobs = {

    checkStatusJob: () => {
        // const url = 'http://google.com';
        const url = 'http://localhost:3000/posts'
        new CheckService(
            fileSystemLogRepository,
            () => console.log(`${url} is ok`),
            (error) => console.log(error),
        ).execute(url);
    },

    sendEmailJob: () => {
        new SendEmailLogs(emailService, fileSystemLogRepository)
            .execute('diegorodriguez999x@gmail.com');
    },
}

export class Server {

    static start() {

        let timeRemaining = 60*5;        

        setInterval(() => {

            timeRemaining -= 10;
            if (timeRemaining != 0)
                console.log('Time remaining', timeRemaining);
            else
                timeRemaining = 60*5;

        }, 1000 * 10)
        console.log("SERVER STARTING...");
        CronService.createJob('0 */5 * * * *', Jobs.sendEmailJob);
    }
}