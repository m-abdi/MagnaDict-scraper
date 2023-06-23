import { jest } from '@jest/globals';
import runBusinessLogic from '../business';
import Browser from '../app/browser';
import Page from '../app/page';

jest.useFakeTimers();

it("should run business logic and return true", async () => {
    let browser = await Browser.start();
    let page = await Page.new(browser);
    expect(await runBusinessLogic(browser, page.root)).toBeTruthy()
    await browser.close()
}, 60000)

