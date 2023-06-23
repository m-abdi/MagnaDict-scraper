import Browser from "../browser";
import { jest } from '@jest/globals';
import Logger from "../logger";

jest.useFakeTimers();

it("must open the browser and be ready to take orders", async () => {
    const browser = await Browser.start()
    expect(browser).toBeTruthy()
})

it("must give me a logger instance", async () => {
    const logger = new Logger()
    expect(logger).toBeInstanceOf(Logger)
})