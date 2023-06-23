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

// export default async function run(browser: Browser, page: Page, task: Task) {
//     await page.goto(task.url)
//     for (const tag of task.tags) {
//         console.log(tag);
//         await page.waitForSelector(tag)
//         const desiredElements = await page.$$(tag)
//         for (const element of desiredElements) {
//             // decide what to do

//             // text content
//             // const text = await element?.evaluate(el => el.textContent);
//             // console.log(text);


//             // screenshot
//             await element.screenshot({path: `results/sldkf.png`,})

//         }

//     }
// }


export default async function run(browser: Browser, page: Page) {
    const tasks = await taskRepo.get_all()
    for (const task of tasks) {
        // just waiting tasks
        if (task.status === 'waiting') {
            logger.info({ browser: browser, page: page, task: task }, { function: "run", type: "input" })
            const word = 'freedom'
            const language = 'en'
            try {
                const { data, word: dictionaryWord } = await cambridgeData(word);
                const picture_url = await giveMeFirstImage(
                    word + ' ' + 'picture',
                    browser,
                    page
                );
                logger.info({ ...data, picture_url },{ function: "run", type: "result" })
                return await exporter.toJsonFile({ ...data, picture_url }, `results/${task.name}.json`)
            } catch (e) {
                logger.error(e.message, { function: "run", type: "exception" })
                return false
            }
        }
    }

}