import { envs } from "./config/plugins/envs.plugin";
import 'dotenv/config';
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
    await main();
})();

async function main() {

    const connected = await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });
    await Server.start();
    // MongoDataBase.disconnect();
} 