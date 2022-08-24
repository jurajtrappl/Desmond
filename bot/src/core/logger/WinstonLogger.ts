import { injectable } from 'inversify'
import { createLogger, format, transports } from 'winston'
import moment from 'moment'
import { ILogger } from './ILogger'

@injectable()
export class WinstonLogger implements ILogger {
    logger

    constructor() {
        this.logger = createLogger({
            format: format.combine(
                format.splat(),
                format.colorize({
                    all: true
                }),
                format.timestamp({
                    format: moment().format('YYYY-MM-DD hh:mm:ss')
                }),
                format.printf(
                    ({ level, message, timestamp }) =>
                        `${timestamp} ${level}: ${message}`
                )
            ),
            transports: [new transports.Console()]
        })
    }

    debug(message: string): void {
        this.logger.debug(message)
    }

    info(message: string): void {
        this.logger.info(message)
    }

    error(message: string): void {
        this.logger.error(message)
    }

    warn(message: string): void {
        this.logger.warn(message)
    }
}
