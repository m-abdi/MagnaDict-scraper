import TaskRepo, { Task } from "../app/task"
import { Page, Browser } from "puppeteer";
import Export from "../data/export";
import cambridgeData from './cambridge'
import Logger from "../app/logger";
import giveMeFirstImage from './searchImage'

let logger = new Logger()
logger = logger.child({ module: 'src/business/index.ts' })

const exporter = new Export();
const taskRepo = new TaskRepo();

export default async function run(browser: Browser, page: Page) {
    const tasks = await taskRepo.get_all()
    
    for (const task of tasks) {
        // just waiting tasks
        if (task.status === 'waiting') {
            logger.info({ browser: browser, page: page, task: task }, { function: "run", type: "input" })
            const word = task?.data?.word
            const language = task?.data?.language
            try {
                const { data, word: dictionaryWord } = await cambridgeData(task?.url, word);
                if (data.length === 0) {
                    logger.info('cambridge data is not available', { function: "run", type: "ignore" })
                    continue
                }
                const picture_url = await giveMeFirstImage(
                    word + ' ' + 'picture',
                    browser,
                    page
                );
                const result = { word: dictionaryWord, language, cambridge: data, picture_url };
                logger.info(result, { function: "run", type: "result" })

                // choose export strategy based on env
                if (process.env.EXPORT_TO === 'file') {
                    await exporter.toJsonFile(result, `./results/${new Date(Date.now()).toDateString()}.json`)
                } else if (process.env.EXPORT_TO === 'elasticsearch') {
                    await exporter.toElasticIndex(result)
                } else if (process.env.EXPORT_TO === 'http') {
                    await exporter.toHttpRequest(process.env.EXPORT_URL ?? '', result)
                }
                task.status = 'done'
            } catch (e) {
                logger.error(e.message, { function: "run", type: "exception" })
                continue
            }
        }
    }

}