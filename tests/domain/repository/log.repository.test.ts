import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../src/domain/repository/log.repository';

// Practicament que lo mismo para la clase
// abstracta 'LogDataSource'.

describe('log.repository LogRepository', () => {

    const newLog = new LogEntity({
        origin: 'log.repository.test',
        message: 'test-message',
        level: LogSeverityLevel.medium,
    });

    class MockLogRepository implements LogRepository {
        async saveLogs(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }
    }

    test('testing the abstract class', async () => {

        const mock = new MockLogRepository();
        expect(mock).toBeInstanceOf(MockLogRepository);
        expect(typeof mock.saveLogs).toBe('function');
        expect(typeof mock.getLogs).toBe('function');
        await mock.saveLogs(newLog);
        const logs = await mock.getLogs(LogSeverityLevel.high);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });

});