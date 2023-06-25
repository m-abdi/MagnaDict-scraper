import fs from 'fs'
import Logger from '../app/logger';
import axios from 'axios';

let logger = new Logger()
logger = logger.child({ module: 'src/data/exports.ts' })


export default class Export {
    async toJsonFile(content: any, destination: string) {
        let data = JSON.stringify(content)
        fs.appendFile(destination, data, (r) => {
            console.log(r);
        })
    }

    async toElasticIndex(document: any, index: string = process.env.ELASTICSEARCH_INDEX ?? 'dictionary') {
        logger.info({ index, document }, { function: "toElasticIndex", type: "input" })
        try {
            const result = await axios.post(
                'https://7c5befde96284bf5a82ee328a9b3e22f.us-central1.gcp.cloud.es.io:443/search-dictionary/_doc?pipeline=ent-search-generic-ingestion',
                document,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `ApiKey ${process.env.ELASTICSEARCH_APIKEY}`
                    },
                }
            );
            logger.info({ result }, { function: "toElasticIndex", type: "result" })
            return result
        } catch (error) {
            logger.error(error.message, { function: "toElasticIndex", type: "exception" })
            return false
        }
    }

    async toHttpRequest(url: string, data: any) {
        logger.info({ url, data }, { function: "toHttpRequest", type: "input" })

        try {
            const result = await axios.post(
                url, data
            );
            logger.info({ result }, { function: "toHttpRequest", type: "result" })
            return result
        } catch (error) {
            logger.error(error.message, { function: "toHttpRequest", type: "exception" })
            return false
        }
    }


}