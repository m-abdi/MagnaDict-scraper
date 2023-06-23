import { Task } from "../app/task"
import { Page, Browser } from "puppeteer";
import Export from "../data/export";
import cambridgeData from './cambridge'
import Logger from "../app/logger";


let logger = new Logger()
logger = logger.child({ module: 'src/business/index.ts' })

const exporter = new Export();

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


export default async function run(browser, page, task) {
    logger.info({ browser: browser, page: page, task: task }, JSON.stringify({ function: "run", type: "input" }))
    const word = 'freedom'
    const language = 'en'
    try {
        const { data, word: dictionaryWord } = await cambridgeData(word);
        logger.info({ data, dictionaryWord }, { function: "run", type: "output" })

        // console.log(await exporter.toJsonFile(data, 'results/final.json'))
        // const picture_url = await giveMeFirstImage(
        //     word + ' ' + 'picture',
        //     browser,
        //     page
        // );
        // console.log(picture_url);
        throw new Error("My error in run business logic");
        

    } catch (e) {
        logger.error({ browser: browser, page: page, task: task }, { function: "run", type: "exception" })
    }
}