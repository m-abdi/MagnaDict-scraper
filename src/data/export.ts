import fs from 'fs'

export default class Export {
    async toJsonFile(content: any, destination: string) {
        let data = JSON.stringify(content)
        fs.writeFile(destination, data, (r)=>{
            console.log(r);
            
        })
    }
}