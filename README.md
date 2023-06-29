# Web Scraper for MagnaDict

<p align="center">
<img src="https://github.com/m-abdi/MagnaDict-scraper/blob/master/overview.png?raw=true" alt="overview of the project" >
</p>
This web scraper is a TypeScript code that belongs to Magnadict, a web service that collects and provides data from online dictionaries. It uses ```puppeteer``` and ```node-html-parser``` libraries to scrape data from sources like Cambridge and others.  It also adds relevant images from Google to enrich the data. It saves the data in a JSON file or sends it to other destinations, such as Elasticsearch or an HTTP request for further processing.


## How to use it
To install the dependencies, you can use either npm or yarn.
-  If you use npm, run:
```sh
npm install
```

-  If you use yarn, run:
```sh
yarn add
```

2.Change the name of .env.template file to .env


3.Run the project

- If you use npm, run:
```sh
npm run start
```

- If you use npm, run:
```sh
yarn run bundle
```

4.Results are saved in a json file inside "results" folder.
<br /><br />
## Configuration
The .env file contains some environmental variables that control some behaviors:

○  NODE_ENV:<br />
it can be set to "development" or "production", in development mode it opens chrome in headfull mode. but in production mode the chrome is headless and remote. so BROWSER_WS_ENDPOINT must be set to a valid remote chrome. like the one provided by this image: https://hub.docker.com/r/browserless/chrome

<br />○  BROWSER_WS_ENDPOINT:<br />
Read previous item.

<br />○  EXPORT_TO:<br />
It determines the exporting strategy. the default is "file" which means saving to "results" folder. It can be set to elasticsearch or http to send data to external services for storing and processing.

<br />○  EXPORT_URL:<br />
if you have set the "EXPORT_TO" to http, this value must be set too. the results are sent as a POST request to this endpoint.

<br />○  ELASTIC_*:<br />
The address and credentials needed to connect to an elasticsearch cluster.


<br /><br />
## Run with docker
This method uses browserless/chrome as a remote Chrome browser and sends results to a self-hosted Elasticsearch service that can be viewed and analyzed by Kibana.

1.Run docker compose in the terminal:
```
sudo docker compose up
```
2.Open your web browser and go to http://localhost:5601

3.Results are saved under the “dictionary” index in Elasticsearch.
