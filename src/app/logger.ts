import { pino } from "pino";


export default class Logger {
    private static instance: Logger
    private baseLogger: pino.Logger

    constructor(childLogger: any = null) {
        if (childLogger) {
            this.baseLogger = childLogger
            return
        }
        if (!Logger.instance) {
            Logger.instance = this
            this.baseLogger = pino({ level: process.env.NODE_ENV === 'production' ? 'info' : "trace" })
        }
        return Logger.instance
    }


    async info(data: any, msg: any = undefined) {
        this.baseLogger.info({data}, msg)
    }

    async error(data: any, msg: any = undefined) {
        this.baseLogger.error({data}, msg)
    }


    child(bindings: any)  {
        return new Logger(this?.baseLogger?.child(bindings))
    }
}