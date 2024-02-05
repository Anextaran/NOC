import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
    // Her we can change to the system we want
    // whether is postgreSQL, mongoDB or the system...
);


export class Server {

    static start() {
        console.log("Server started...");
        CronService.createJob(

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
        );
    }
}