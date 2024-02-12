import { MongoDataBase } from '../../../../src/data/mongo/init';
import { envs } from '../../../../src/config/plugins/envs.plugin';
import { LogModel } from '../../../../src/data/mongo/models/log.model';

describe('log.model.test.ts', ()=>{

    beforeAll(async ()=>{        
       await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
       });
    });

    afterAll(async()=>{
        MongoDataBase.disconnect();
    })

    test('should return LogModel',async ()=>{

        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low',
        }

        const log = await LogModel.create(logData);
        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }));
    });

    // if the schema changes, change this test
    test('should return the schema object',()=>{

        const schema = LogModel.schema.obj;
        // Take a look using console.log(schema) to get a raw view 
        // of the schema
        expect(schema).toEqual(expect.objectContaining(
            {
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function) },
                level: {
                    type: expect.any(Function),
                    enum: ['low', 'medium', 'high'],
                    default: 'low'
                },
                createdAt: expect.any(Object)
            }
        ));
    });

});