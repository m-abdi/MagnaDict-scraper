import fs from 'fs'

export class Task {
    id: any
    name: string
    url: string;
    tags: string[];
    startAt: string | null
    allowedDelay: number | null
    paginationTag: string | null
    status: 'done' | 'waiting'
    data: any

    constructor(id: any, name: string, url: string, tags: string[], startAt: string | null = null, allowedDelay: number | null = null, paginationTag: string | null = null, status, data: any) {
        this.id = id
        this.name = name
        this.url = url
        this.tags = tags
        this.startAt = startAt
        this.allowedDelay = allowedDelay
        this.paginationTag = paginationTag
        this.status = status
        this.data = data
    }
}



export default class TaskRepo {
    private static instance: TaskRepo;
    private static allTasks: any;

    constructor() {
        if (TaskRepo.instance) {
            TaskRepo.instance = this
        }
        return TaskRepo.instance

        // get all tasks from db ->
    }

    // async get_by_id(id: string) {
    //     return new Task('test-task', 'http://books.toscrape.com/', ['li.col-xs-6'], '', 10, '.next > a:nth-child(1)', 'waiting')
    // }


    async get_all() {
        // return TaskRepo.allTasks;
        let tasks: any = []
        try {
            tasks = JSON.parse(fs.readFileSync('./input/tasks.json').toString())
        } catch (e) {
            if (e.message.includes('ENOENT: no such file or directory')) {
                const words = Object.keys(JSON.parse(fs.readFileSync('./input/all_english_words.json').toString()))
                words.forEach((word, index) => {
                    tasks.push({
                        "id": Date.now() + index,
                        "name": `Cambridge - ${word}`,
                        "url": `https://dictionary.cambridge.org/dictionary/english/${word}`,
                        "status": "waiting",
                        "data": {
                            word,
                            language: 'en'
                        }
                    })
                })
                fs.writeFileSync('./input/tasks.json', JSON.stringify(tasks))
            }
        }
        return tasks?.map(task => {
            return new Task(task.id, task.name, task.url, task.tags, task.startAt, task.allowedDelay, task.paginationTag, task.status, task.data)
        })
    }
}