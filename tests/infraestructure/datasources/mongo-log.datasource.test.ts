import { MongoDataBase } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/envs.plugin';
import { MongoLogDataSource } from '../../../src/infraestructure/datasources/mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongo';
import { LogDataSource } from '../../../src/domain/datasources/log.datasource';

describe('mongo-log.datasource.ts MongoLogDataSource',()=>{

    const logDataSource = new MongoLogDataSource();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts',
    })

    beforeAll(async()=>{

        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        })
    })

    afterAll(async()=>{        
        await MongoDataBase.disconnect();
    })

    afterEach(async()=>{
        await LogModel.deleteMany(); // delete all logs created by the test
    })

    test('should create a log', async ()=>{

        const logSpy = jest.spyOn(console,'log'); // listening to 'console.log'
        await logDataSource.saveLogs(log);
        // No tenemos otra cosa que el console.log para probar jajajajajxddddddd
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Mongo log created',expect.any(String))

    });

    test('should get logs', async()=>{

        await logDataSource.saveLogs(log);
        await logDataSource.saveLogs(log);
        const logs = await logDataSource.getLogs(log.level);
        // database must be cleaned by 'afterEach'
        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(log.level);
    });

})