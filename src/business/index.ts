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
            const language = 'en'
            try {
                const { data, word: dictionaryWord } = await cambridgeData(word);
                const picture_url = await giveMeFirstImage(
                    word + ' ' + 'picture',
                    browser,
                    page
                );
                const result = {word: dictionaryWord, cambridge: data, picture_url };
                logger.info(result, { function: "run", type: "result" })
                //  await exporter.toJsonFile(result, `results/${task.name}.json`)
                await exporter.toElasticIndex(result)
                return result

            } catch (e) {
                logger.error(e.message, { function: "run", type: "exception" })
                return false
            }
        }
    }

}