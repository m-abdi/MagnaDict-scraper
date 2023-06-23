import puppeteer from 'puppeteer';
import { sleep } from './helpers';
import Logger from './logger';

let logger = new Logger()
logger = logger.child({module: 'src/app/browser.ts'})


export default class Browser {
	private static instance: any
	root: any;
	pages: any


	public static async start() {
		if (!Browser.instance) {
			try {
				logger.info("Opening the browser......")
				
				Browser.instance = await puppeteer.launch({
					headless: process.env.NODE_ENV === 'production',
					defaultViewport: {
						width: 1791,
						height: 980,
					},
					timeout: 40000,
					args: ["--disable-setuid-sandbox",
						'--window-size=1920,1080'
					],
					'ignoreHTTPSErrors': true
				})
				// this.root = Browser.instance
				logger.info('Browser is ready.')
				return Browser.instance
			}
			catch (err) {
				logger.error(err.message)
			}
		}
		return Browser.instance;

	}

}