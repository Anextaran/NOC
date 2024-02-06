export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {

        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {

        const { message, level, createdAt } = JSON.parse(json);
        const log = new LogEntity({
            level,
            message,
            createdAt,
            origin,
        })
        log.createdAt = new Date(createdAt);
        return log;
    }
}