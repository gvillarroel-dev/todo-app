export class Note {
    constructor(content) {
        this.id = this._generateId();
        this.content = content;
        this.createdAt = new Date();
    }

    _generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }
}