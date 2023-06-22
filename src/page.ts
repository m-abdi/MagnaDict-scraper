import Browser from "./browser";
import { sleep } from "./helpers";

export default class Page {
    private browser: any
    root: any

    constructor(root: any, browser: any) {
        this.root = root
    }

    static async new(browserInstance: any) {
        const browser = await browserInstance;
        const root = await browserInstance.newPage().then(r => r)
        return new Page(root, browser);
    }

    async goto(url: string): Promise<boolean> {
        try {
            console.log(this.root);
            await this.root.goto(url);
            console.log(`Navigating to ${url}...`);
            return true;
        } catch (err) {
            console.error('Could not open url: ' + url + '\n' + err);
            return false;
        }
    }

    async type(selector: string, text: string): Promise<boolean> {
        try {
            await this.browser.type(selector, text);
            return true;
        } catch (err) {
            console.error('Could not type to page: ' + selector + '\n' + text + '\n' + err);
            return false;
        }
    }
}


//   // Wait and click on first result
//   const searchResultSelector = '.search-box__link';
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

//   // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     'text/Customize and automate'
//   );
//   const fullTitle = await textSelector?.evaluate(el => el.textContent);

//   // Print the full title
//   console.log('The title of this blog post is "%s".', fullTitle);

//   await browser.close();