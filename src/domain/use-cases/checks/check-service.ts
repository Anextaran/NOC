import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback = (error: string) => void;

const origin = 'src/domain/use-cases/checks/check-service.ts';

export class CheckService implements CheckServiceUseCase {

    // dependency injections
    constructor(
        private readonly logRepository: LogRepository,
        private readonly succesCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback,
    ) { }

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok)
                throw new Error(`Error on check service ${url}`);
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin,
            });
            this.logRepository.saveLogs(log);
            this.succesCallback();
            return true;
        } catch (error) {

            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin
            });
            this.logRepository.saveLogs(log);
            this.errorCallback(`${error}`);
            return false;
        }
    }
}