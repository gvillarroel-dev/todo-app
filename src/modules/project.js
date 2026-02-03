export class Project {
	constructor(name) {
		if (!name || typeof name !== "string" || !name.trim()) {
			throw new Error("Project name must be a non-empty string");
		}

		this.id = this._generateId();
		this.name = name.trim();
		this.todos = [];
		this.createdAt = new Date();
	}

	_generateId() {
		return (
			Date.now().toString(36) + Math.random().toString(36).substring(2)
		);
	}

	_isValidTodo(todo) {
		return (
			todo &&
			typeof todo === "object" &&
			"id" in todo &&
			"title" in todo &&
			"description" in todo &&
			"isComplete" in todo &&
			typeof todo.toggleComplete === "function"
		);
	}

	addTodo(todo) {
		if (!this._isValidTodo(todo)) {
			throw new Error(
				"Invalid todo object. Must be an instance of Todo class.",
			);
		}

		if (this.todos.some((t) => t.id === todo.id)) {
			throw new Error(
				`Todo with id ${todo.id} already exists in this project`,
			);
		}

		this.todos.push(todo);
		return true;
	}

	removeTodo(todoId) {
		if (!todoId || typeof todoId !== "string") {
			throw new Error("todoId must be a non-empty string");
		}

		const index = this.todos.findIndex((todo) => todo.id === todoId);
		if (index === -1) {
			throw new Error(`Todo with id ${todoId} not found`);
		}

		const removed = this.todos.splice(index, 1);
		return removed[0];
	}

	getTodo(todoId) {
		if (!todoId) {
			return null;
		}
		return this.todos.find((todo) => todo.id === todoId) || null;
	}

	getAllTodos() {
		return [...this.todos];
	}

    updateTodo(todoId, newData) {
        const todo = this.getTodo(todoId);

        if (!todo) {
            throw new Error(`Todo with id ${todoId} not found`);
        }

        if (todo.editTodo && typeof  todo.editTodo === "function") {
            todo.editTodo(newData);
            return true;
        }

        return false;
    }

	editProject(newData) {
		if (newData.name && typeof newData.name === "string" && newData.name.trim()) {
			this.name = newData.name.trim();
            return true;
		}
        return false;
	}
}
