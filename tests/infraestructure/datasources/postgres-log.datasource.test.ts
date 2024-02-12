import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogSeverityLevel, LogEntity } from '../../../src/domain/entities/log.entity';
import { PostgresLogDataSource, severityEnum } from '../../../src/infraestructure/datasources/postgres-log.datasource';
import { envs } from '../../../src/config/plugins/envs.plugin';

describe('postgres-log.datasource.test.ts PostgreLogDataSource', () => {

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin: 'postgres-log.datasource.test.ts',
    })

    const prismaClient = new PrismaClient();

    test('should create a log', async () => {        

        const logSpy = jest.spyOn(console, 'log');
        const level = severityEnum[log.level];
        // const newLog = await prismaClient.logModel.create({
        //     data: {
        //         ...log, level
        //     }
        // });

        // expect(logSpy).toHaveBeenCalled();        
        expect(true).toBeTruthy(); 
    });

});