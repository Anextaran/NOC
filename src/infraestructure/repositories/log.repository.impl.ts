import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';


export class LogRepositoryImpl implements LogRepository{

    constructor(
        // Protip: Al ponerlo aqui lo recibe como argumento
        // y lo establece como propiedad en una sola linea
        private readonly logDataSource: LogDataSource,

    ){}

    async saveLogs(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLogs(log);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }
}