import puppeteer from 'puppeteer';
import { sleep } from './helpers';

export default class Browser {
	private static instance: any
	root: any;


	private constructor() {
		try {
			console.log("Opening the browser......");
			const openedBrowser = puppeteer.launch({
				headless: process.env.NODE_ENV === 'production',
				args: ["--disable-setuid-sandbox"],
				'ignoreHTTPSErrors': true
			})
			this.root = openedBrowser
			console.log('Browser is ready.');
		}
		catch (err) {
			console.error("Could not create a browser instance => : ", err);
		}
	}


	public static async start() {
		if (!Browser.instance) {
			try {
				console.log("Opening the browser......");
				Browser.instance = await puppeteer.launch({
					headless: process.env.NODE_ENV === 'production',
					args: ["--disable-setuid-sandbox"],
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