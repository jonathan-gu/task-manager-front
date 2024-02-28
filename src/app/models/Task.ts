export default class Task {
    id: number
    name: string
    dueDate: Date
    status: boolean

    constructor(id: number, name: string, dueDate: Date, status: boolean) {
        this.id = id,
        this.name = name,
        this.dueDate = dueDate,
        this.status = status
    }
}