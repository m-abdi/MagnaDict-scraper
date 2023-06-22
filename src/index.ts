import Browser from './browser';
import Page from './page'

async function main() {
    let browserInstance = await Browser.start();
    let page =  await Page.new(browserInstance);
    await page.goto('https://www.mehdiabdi.com')
}


main()

