import path from "path";
import fs from 'fs';
import { FileSystemDataSource } from '../../../src/infraestructure/datasources/file-system.datasource';
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";
import { LogDataSource } from "../../../src/domain/datasources/log.datasource";

describe('file-system.datasource.test.ts FileSystemDataSource', () => {

    const logPath = path.join(__dirname, '../../../logs');
    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    })

    test('should create log files if they dont exist', () => {

        // at the moments its created, creates the 'logs' files
        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
    });

    test('should save a log in logs-all.log', () => {

        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
        });

        logDataSource.saveLogs(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in logs-all.log and logs-medium.log', () => {

        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts',
        });

        logDataSource.saveLogs(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in logs-all.log and logs-high.log', () => {


        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
        });

        logDataSource.saveLogs(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs', async () => {

        const logDataSource = new FileSystemDataSource();
        const logLow = new LogEntity({
            message: 'testmessage',
            level: LogSeverityLevel.low,
            origin: 'low',
        });
        const logMedium = new LogEntity({
            message: 'testmessage',
            level: LogSeverityLevel.medium,
            origin: 'medium',
        });
        const logHigh = new LogEntity({
            message: 'testmessage',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
        });

        await logDataSource.saveLogs(logLow);
        await logDataSource.saveLogs(logMedium);
        await logDataSource.saveLogs(logHigh);

        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    });

    test('should throw an error if severity level is not defined', async () => {

        const logDataSource = new FileSystemDataSource();
        // takes this string as a 'LogSeverityLevel'.
        const customSeverityLevel = 'SUPER_MEGA_WRONG_LEVEL' as LogSeverityLevel;
        try {
            await logDataSource.getLogs(customSeverityLevel);
            expect(true).toBe(false);
        } catch (error) {
            expect(true).toBeTruthy();
        }

    });

});