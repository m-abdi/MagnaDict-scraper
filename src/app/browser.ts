import puppeteer from 'puppeteer';
import { sleep } from './helpers';

export default class Browser {
	private static instance: any
	root: any;
	pages: any


	public static async start() {
		if (!Browser.instance) {
			try {
				console.log("Opening the browser......");
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
				console.log('Browser is ready.');
				return Browser.instance
			}
			catch (err) {
				console.error("Could not create a browser instance => : ", err);
			}
		}
		return Browser.instance;

	}

}