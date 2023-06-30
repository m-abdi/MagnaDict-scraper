import TaskRepo, { Task } from "../app/task"
import { Page } from "../app/page";
import PageRepo from "../app/page";
import Export from "../data/export";
import cambridgeData from './cambridge'
import Logger from "../app/logger";
import giveMeFirstImage from './searchImage'
import Browser from "../app/browser";
let logger = new Logger()
logger = logger.child({ module: 'src/business/index.ts' })

const exporter = new Export();
const taskRepo = new TaskRepo();

export default async function run() {
    // Initialization
    let browser = await Browser.start();
    let pages = await PageRepo.getPages(browser)
    const tasks = await taskRepo.get_all()

    // Do tasks
    for (const task of tasks) {
        if (task.status === 'waiting') {
            logger.info({ browser: browser, page: pages[0], task: task }, { function: "run", type: "input" })
            const word = task?.data?.word
            const language = task?.data?.language
            try {
                const { data, word: dictionaryWord } = await cambridgeData(task?.url, word);
                if (data.length === 0) {
                    logger.info('cambridge data is not available', { function: "run", type: "ignored" })
                    await taskRepo.update(task?.id as string, { status: 'ignored' })
                    continue
                }
                const picture_url = await giveMeFirstImage(
                    word + ' ' + 'picture',
                    browser,
                    pages[0]
                );
                const result = { word: dictionaryWord, language, cambridge: data, picture_url };
                logger.info(result, { function: "run", type: "result" })


                // persist result
                await exporter.save(result)
                await taskRepo.update(task?.id as string, { status: 'done' })

            } catch ({ name, message }) {
                logger.error({ name, message }, { function: "run", type: "exception" })
                if (name === 'TargetCloseError' || message.includes('browser has disconnected!')) {
                    break
                } else if (message.includes('getaddrinfo EAI_AGAIN')) {
                    logger.error("Check your internet connection", { function: "run", type: "exception" })
                    break
                }
                continue
            }
        }
    }

}