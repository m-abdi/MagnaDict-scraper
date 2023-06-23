import { Task } from "../app/task"
import { Page, Browser } from "puppeteer";
import Export from "../data/export";
import cambridgeData from './cambridge'

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


export default async function run() {
    const word = 'freedom'
    const language = 'en'
    try {
        const { data, word: dictionaryWord } = await cambridgeData(word);
        console.log(await exporter.toJsonFile(data, 'results/final.json'))
        // const picture_url = await giveMeFirstImage(
        //     word + ' ' + 'picture',
        //     browser,
        //     page
        // );
        // console.log(picture_url);

    } catch (e) {
        console.error(e.message);
    }
}