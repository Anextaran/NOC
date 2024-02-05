import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";
import 'dotenv/config'

(async () => {
    await main();
})();

function main() {
    // console.log("Beggining service");
    //Server.start();    
    console.log(envs.PORT);
} 
