import Browser from './app/browser';
import cambridgeData from './business/parser';
import giveMeFirstImage from './business/searchImage';
import Export from './data/export';
import Page from './app/page'


const exporter = new Export()

async function businessLogic() {
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



async function main() {
    // let browser = await Browser.start();
    // let page = await Page.new(browser);
    // await page.goto('https://www.mehdiabdi.com')
    console.log(await businessLogic());
    // await browser.close()
}


main()

