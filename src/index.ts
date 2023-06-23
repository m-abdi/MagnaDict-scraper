import Browser from './app/browser';
import Export from './data/export';
import Page from './app/page'
import TaskRepo from './app/task';
import runBusinessLogic from './business';
import 'dotenv/config'

async function main() {
    let browser = await Browser.start();
    let page = await Page.new(browser);
    // await page.goto('https://www.mehdiabdi.com')
    await runBusinessLogic(browser, page.root)
    await browser.close()
    // console.log(await businessLogic());
    // await browser.close()
}


main()

