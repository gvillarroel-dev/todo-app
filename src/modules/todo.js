export class Todo {
	constructor(title, description, priority, dueDate, notes = "") {
		this.id = this._generateId();
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.dueDate = dueDate;
		this.createdAt = new Date();
		this.notes = notes;
		this.isComplete = false;
	}

	_generateId() {
		return (Date.now().toString(36) + Math.random().toString(36).substring(2));
	}

	isDueSoon(daysAhead = 3) {
		if (this.isComplete) return false;
		const due = new Date(this.dueDate);
		const soon = new Date();

		soon.setDate(soon.getDate() + daysAhead);
		return new Date() < due && due <= soon;
	}

	isDueToday() {
		const today = new Date();
		const due = new Date(this.dueDate);
		return today.toDateString() === due.toDateString();
	}

	isOverdue() {
		if (this.isComplete) return false;
		return new Date() > new Date(this.dueDate);
	}

    getStatus() {
        if (this.isComplete) return "completed";
        if (this.isOverdue()) return "overdue";
        if (this.isDueToday()) return "due-today";
        if (this.isDueSoon()) return "due-soon";
        return "normal";
    }

	toggleComplete() {
		this.isComplete = !this.isComplete;
	}

	editTodo(newData) {
		const allowedFields = [
			"title",
			"description",
			"dueDate",
			"priority",
			"notes",
		];

		allowedFields.forEach((field) => {
			if (newData.hasOwnProperty(field)) {
				this[field] = newData[field];
			}
		});
        
		return this;
	}
}
