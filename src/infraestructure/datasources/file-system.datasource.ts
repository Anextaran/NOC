import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import fs from 'fs';

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath))
            // create 'logs/'
            fs.mkdirSync(this.logPath);
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            // to create the file, but does not write anyth
            fs.writeFileSync(path, '');
        })
    }

    private getsLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, "utf-8");
        const logs = content.split('\n').map(LogEntity.fromJson);
        return logs;
    }

    async saveLogs(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`;
        // Add a line at the end of the file
        fs.appendFileSync(this.allLogsPath, logAsJson);

        switch (newLog.level) {

            case LogSeverityLevel.low: return;
            case LogSeverityLevel.medium: fs.appendFileSync(this.mediumLogsPath, logAsJson);
            case LogSeverityLevel.high: fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getsLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getsLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getsLogsFromFile(this.highLogsPath);
            default: 
            throw new Error(`${severityLevel} not implemented`);
        }
    }
}