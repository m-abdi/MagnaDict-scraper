import fs from 'fs'
import Logger from '../app/logger';
import axios from 'axios';
import { Client } from '@elastic/elasticsearch';

let logger = new Logger()
logger = logger.child({ module: 'src/data/exports.ts' })


const elasticsearchClient = new Client({
    node: process.env.ELASTIC_HOST,
    auth: {
        username: process.env.ELASTIC_USERNAME ?? '',
        password: process.env.ELASTIC_PASSWORD ?? '',
    },
    tls: {
        rejectUnauthorized: false
    }
})

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
            const result = await elasticsearchClient.index({
                index,
                document
            })
            await elasticsearchClient.indices.refresh({ index })
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