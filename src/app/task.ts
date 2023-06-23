export class Task {
    name: string
    url: string;
    tags: string[];
    startAt: string | null
    allowedDelay: number | null
    paginationTag: string | null
    status: 'done' | 'waiting'

    constructor(name: string, url: string, tags: string[], startAt: string | null = null, allowedDelay: number | null = null, paginationTag: string | null = null, status) {
        this.name = name
        this.url = url
        this.tags = tags
        this.startAt = startAt
        this.allowedDelay = allowedDelay
        this.paginationTag = paginationTag
        this.status = status
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

    async get_by_id(id: string) {
        return new Task('test-task', 'http://books.toscrape.com/', ['li.col-xs-6'], '', 10, '.next > a:nth-child(1)', 'waiting')
    }


    async get_all() {
        // return TaskRepo.allTasks;
        return [new Task('test-task', 'http://books.toscrape.com/', ['li.col-xs-6'], '', 10, '.next > a:nth-child(1)', 'waiting')]
    }
}