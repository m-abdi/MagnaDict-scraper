import puppeteer from 'puppeteer';
import { sleep } from './helpers';
import Logger from './logger';

let logger = new Logger()
logger = logger.child({ module: 'src/app/browser.ts' })


export default class Browser {
	private static instance: any

	public static async start() {
		if (!Browser.instance) {
			try {
				logger.info("Opening the browser......")

				// decide which chrome to use:
				if (process.env.NODE_ENV === 'production') {
					// remote chrome as a service
					Browser.instance = await puppeteer.connect({
						browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
						defaultViewport: {
							width: 1791,
							height: 980,
						},
						ignoreHTTPSErrors: true,
						protocolTimeout: 180000 // 3 minutes
					})
				} else {
					// locally installed chrome
					Browser.instance = await puppeteer.launch({
						headless: false,
						defaultViewport: {
							width: 1791,
							height: 980,
						},
						timeout: 40000,
						args: ["--disable-setuid-sandbox",
							'--window-size=1920,1080'
						],
						ignoreHTTPSErrors: true
					})
				}

				// this.root = Browser.instance
				logger.info('Browser is ready.')
			}
			catch (err) {
				logger.error(err.message)
				return false
			}
		}
		return Browser.instance;
	}

	async pages() {
		return Browser.instance.pages()
	}

}