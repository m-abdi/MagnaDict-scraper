import fs from 'fs'
import Logger from '../app/logger';
import axios from 'axios';
import { Client } from '@elastic/elasticsearch';

let logger = new Logger()
logger = logger.child({ module: 'src/data/exports.ts' })


const elasticsearchClient = new Client({
    node: process.env.ELASTIC_HOST ?? 'http://localhost:9200',
    auth: {
        username: process.env.ELASTIC_USERNAME ?? 'elastic',
        password: process.env.ELASTIC_PASSWORD ?? 'elastic',
    },
    tls: {
        rejectUnauthorized: false
    }
})

export default class Export {


    private async toJsonFile(content: any, destination: string) {
        let data = JSON.stringify(content)
        fs.appendFile(destination, data, (r) => {
            console.log(r);
        })
    }

    private async toElasticIndex(document: any, index: string = process.env.ELASTICSEARCH_INDEX ?? 'dictionary') {
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

    private async toHttpRequest(url: string, data: any) {
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

    public async save(result: any) {
        // choose export strategy based on env
        if (process.env.EXPORT_TO === 'file') {
            await this.toJsonFile(result, `./results/${new Date(Date.now()).toDateString()}.json`)
        } else if (process.env.EXPORT_TO === 'elasticsearch') {
            await this.toElasticIndex(result)
        } else if (process.env.EXPORT_TO === 'http') {
            await this.toHttpRequest(process.env.EXPORT_URL ?? '', result)
        }
    }


}