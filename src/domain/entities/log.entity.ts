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

    // Recibe un json y convierte a  un 'LogEntity'
    static fromJson = (json: string): LogEntity => {

        const { message, level, createdAt, origin } = JSON.parse(json);
        const log = new LogEntity({
            level,
            message,
            createdAt,
            origin,
        })
        log.createdAt = new Date(createdAt);
        return log;
    }

    // Recine un objeto (clave-valor), las claves son string
    // el valor puede ser 'any'. Convierte a un 'LogEntity'
    static fromObject = (object: { [key: string]: any }): LogEntity => {

        const { message, level, createdAt, origin } = object;
        if (!message || !level || !createdAt || !origin)
            throw new Error('couldnt create a LogEntity instance from this object');
        const log = new LogEntity({
            message, level, createdAt, origin
        });
        return log;
    }
}