import { LogDataSource } from '../../../src/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('log.datasource.ts LogDataSource', () => {

    const newLog = new LogEntity({

        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
    });

    // This is how our program hopes our abstract class works
    // if extra abstract functions are added to the abstract class
    // then "MockLogDataSource" wont implement "LogDataSource" correctly
    // (We're gonna see the error anyway, but using this test we can indentify
    // the issue faster before node gives an error tryng to build the project)

    class MockLogDataSource implements LogDataSource {

        async saveLogs(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    test('should test the abstract class', async () => {

        const mock = new MockLogDataSource();
        // if the abstract class changes then MockLogDataSource
        // wont be able to implement it, neither instantiate itself
        expect(mock).toBeInstanceOf(MockLogDataSource);
        expect(typeof mock.saveLogs).toBe('function');            
        expect(typeof mock.getLogs).toBe('function'); 
        // We verify the return of getLogs must be an array of LogEntity
        await mock.saveLogs(newLog);
        const logs = await mock.getLogs(LogSeverityLevel.high);
        expect(logs).toHaveLength(1);           
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });

});