import Browser from './app/browser';
import Export from './data/export';
import Page from './app/page'
import TaskRepo from './app/task';
import runBusinessLogic from './business';


const taskRepo = new TaskRepo();





async function doTasks(browser, page) {
    const tasks = await taskRepo.get_all()
    for (const task of tasks) {
        // just waiting tasks
        if (task.status === 'waiting') {
            await runBusinessLogic(browser, page, task)
        }
    }
}



async function main() {
    let browser = await Browser.start();
    let page = await Page.new(browser);
    // await page.goto('https://www.mehdiabdi.com')
    await doTasks(browser, page.root)
    await browser.close()
    // console.log(await businessLogic());
    // await browser.close()
}


main()

