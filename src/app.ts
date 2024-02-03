import { Server } from "./presentation/server";

(async () => {
    await main();
})();

function main() {
    console.log("Beggining service");
    Server.start();    
} 
