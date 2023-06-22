class Task {
    name: string
    url: string;
    tags: string[];
    
    constructor(name: string, url: string, tags: string[]) {
        this.name = name
        this.url = url
        this.tags = tags
    }
}