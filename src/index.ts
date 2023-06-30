import runBusinessLogic from './business';
import 'dotenv/config'
import Logger from './app/logger';

let logger = new Logger()
logger = logger.child({ module: 'src/index.ts' })


async function main() {
    while (true) {
        try {
            await runBusinessLogic()
        } catch ({ name, message }) {
            logger.error({ name, message }, { function: "main", type: "exception" })
            continue
        }
    }
}


main()

