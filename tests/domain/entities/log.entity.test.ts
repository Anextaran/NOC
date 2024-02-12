import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
describe('LogEntity',()=>{


    const dataObj = {
        message: 'Hello World',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts',
    };

    test('should create a LogEntity instance',()=>{
        
        const log = new LogEntity(dataObj);
        // Log Entity works fine
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);        

    });

    test('should create a LogEntity instance from json',()=>{

        const json =`{"message":"test-message","level":"high","createdAt":"2024-02-05T23:35:02.009Z","origin":"log.entity.test.ts"}`;
        const log = LogEntity.fromJson(json);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('test-message');
        expect(log.level).toBe(LogSeverityLevel.high);
        expect(log.origin).toBe('log.entity.test.ts');
        expect(log.createdAt).toBeInstanceOf(Date);        

    });

    test('should create a LogEntity instance from object',()=>{

        const log = LogEntity.fromObject(dataObj);
        // Log Entity works fine
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date); 

    });

});