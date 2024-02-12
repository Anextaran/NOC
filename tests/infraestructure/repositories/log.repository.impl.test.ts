import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepositoryImpl } from '../../../src/infraestructure/repositories/log.repository.impl';

describe('log.repository.impl.test.ts LogRepositoryImpl',()=>{

    const mockLogDataSource ={
        saveLogs:jest.fn(),
        getLogs:jest.fn(),
    }
    const logRepository = new LogRepositoryImpl(mockLogDataSource);

    beforeEach(()=>{
        jest.clearAllMocks();
    })

    test('saveLog should call the datasource with arguments ',async ()=>{


        //Valid
        /* const logg = new LogEntity({
            level: LogSeverityLevel.high,
            message:'jbge',
            origin:'fjebgjhe',
        }) */

        // Its also valid
        const log = {
            level: LogSeverityLevel.high,
            message: 'ekbgebg'
        } as LogEntity

        await logRepository.saveLogs(log);
        expect(mockLogDataSource.saveLogs).toHaveBeenCalledWith(log);
    });

    test('getLogs should call the datasource with arguments ', async () => {

        const lowSeverity = LogSeverityLevel.low;
        await logRepository.getLogs(LogSeverityLevel.low);
        expect(mockLogDataSource.getLogs).toBeCalledWith(lowSeverity);
    });

});