import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {

    static start() {
        console.log("Server started...");
        CronService.createJob(

            '* * * * * *',
            () => {
                const url = 'http://localhost:3000/posts'
                // new CheckService().execute('http://localhost:3000/posts');
                new CheckService(

                    () => console.log(`${url} is ok`),
                    (error) => console.log(error),

                ).execute(url);
            }
        );
    } 
}