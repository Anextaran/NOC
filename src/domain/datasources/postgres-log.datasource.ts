import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

const prismaClient = new PrismaClient();
// The levels in the Prisma scheme and in our implementation
// are different, so we need to use...
const severityEnum = {
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM,
}

export class PostgresLogDataSource implements LogDataSource {

    async saveLogs(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log, level
            }
        });

        console.log('Postgress saved');
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severityEnum[severityLevel];
        const dbLogs = await prismaClient.logModel.findMany({
            where: { level }
        });
        return dbLogs.map(LogEntity.fromObject);
    }
}