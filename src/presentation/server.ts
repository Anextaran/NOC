import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.srvice";
import fs from 'fs';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
    // Her we can change to the system we want
    // whether is postgreSQL, mongoDB or the system...
);

export class Server {

    static start() {
        console.log("Server started...");

        const emailService = new EmailService();
        /* emailService.sendMail({
            to: 'diegorodriguez999x@gmail.com',
            subject: 'System logs',
            htmlBody: `
            
            <h1> NOC Service </h1>
            <img src="https://static.vecteezy.com/system/resources/previews/029/552/830/non_2x/portraits-of-cats-funny-faces-generative-ai-photo.jpg">
            <p> Every day is taco ipsum tuesday. How do you feel about hard shelled tacos? These tacos are lit 🔥. It’s raining tacos, from out of the 
            sky, tacos, don’t even ask why. BARBACOA!! Make it a double there pal. Can you put some peppers and onions on that? Tacos al pastor made with 
            adobada meat. Can you put some peppers and onions on that? BARBACOA!!
            `
        }); */

        emailService.sendEmailWithFileSystemLogs([
            'diegorodriguez999x@gmail.com',
        ]);

        /*          CronService.createJob(
         
                     '* * * * * *',
                     () => {
                         // const url = 'http://google.com';
                         const url = 'http://localhost:3000/posts'                
                         new CheckService(
                             fileSystemLogRepository,
                             () => console.log(`${url} is ok`),
                             (error) => console.log(error),
                         ).execute(url);
                     }
                 ); */
    }
}