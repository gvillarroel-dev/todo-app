import { Project } from "./project.js";
import { Todo } from "./todo.js";

let projects = [];
let activeProjectId = null;

// ============================= HELPERS =============================
const findProjectById = (projectId) => {
	return projects.find((project) => project.id === projectId) || null;
};

const findProjectByIndex = (projectId) => {
	return projects.findIndex((project) => project.id === projectId);
};

// ============================= INITIALIZE APP =============================
export const initializeApp = () => {
	if (projects.length === 0) {
		const defaultProject = new Project("Default");
		projects.push(defaultProject);
		activeProjectId = defaultProject.id;
		return defaultProject;
	}

	return projects[0];
};

// ============================= PROJECT MANAGER =============================
export const createProject = (name) => {
	if (!name || !name.trim()) {
		throw new Error("Project name is required");
	}

	const project = new Project(name);
	projects.push(project);
	return project;
};

export const deleteProject = (projectId) => {
	if (projects.length <= 1) {
		throw new Error("Cannot delete the last project");
	}

	const index = findProjectByIndex(projectId);
	if (index === -1) {
		throw new Error(`Project with id ${projectId} not found`);
	}

	if (projectId === activeProjectId) {
		const newActiveIndex = index === 0 ? 1 : 0;
		activeProjectId = projects[newActiveIndex].id;
	}

	const deleted = projects.splice(index, 1);
	return deleted[0];
};

export const getProject = (projectId) => {
	return findProjectById(projectId);
};

export const getAllProjects = () => {
	return [...projects];
};

export const updateProject = (projectId, newData) => {
	const project = findProjectById(projectId);
	if (!project) {
		throw new Error(`Project with id ${projectId} not found`);
	}

	project.editProject(newData);
	return project;
};

// ============================= ACTIVE PROJECT MANAGER =============================
export const setActiveProject = (projectId) => {
	const project = findProjectById(projectId);
	if (!project) {
		throw new Error(`Project with id ${projectId} not found`);
	}

	activeProjectId = projectId;
	return project;
};

export const getActiveProject = () => {
	return findProjectById(activeProjectId);
};

export const getActiveProjectId = () => {
	return activeProjectId;
};

// ============================= TODO'S MANAGER =============================
export const createTodo = (projectId, todoData) => {
	const project = findProjectById(projectId);
	if (!project) {
		throw new Error(`Project with id ${projectId} not found`);
	}

	const { title, description, priority, dueDate, notes } = todoData;
	const todo = new Todo(title, description, priority, dueDate, notes);

	project.addTodo(todo);
	return todo;
};

export const deleteTodo = (projectId, todoId) => {
	const project = findProjectById(projectId);
	if (!project) {
		throw new Error(`Project with id ${projectId} not found`);
	}

	return project.removeTodo(todoId);
};

export const updateTodo = (projectId, todoId, newData) => {
	const project = findProjectById(projectId);
	if (!project) {
		throw new Error(`Project not found`);
	}

	project.updateTodo(todoId, newData);
	return project.getTodo(todoId);
};

export const toggleTodoComplete = (projectId, todoId) => {
	const project = findProjectById(projectId);
	if (!project) {
		throw new Error(`Project with id ${projectId} not found`);
	}

	const todo = project.getTodo(todoId);
	if (!todo) {
		throw new Error(`Todo with id ${todoId} not found`);
	}

	todo.toggleComplete();
	return todo;
};

export const getTodo = (projectId, todoId) => {
	const project = findProjectById(projectId);
	if (!project) {
		return null;
	}

	return project.getTodo(todoId);
};

// ============================= Utilities?? =============================
export const getState = () => {
	return {
		projects: projects.map((project) => ({
			id: project.id,
			name: project.name,
			todos: project.getAllTodos(),
			createdAt: project.createdAt,
		})),
		activeProjectId,
	};
};

export const loadState = (state) => {
	if (!state || !state.projects) {
		return;
	}

	projects = state.projects.map((projectData) => {
		const project = new Project(projectData.name);
		project.id = projectData.id;
		project.createdAt = new Date(projectData.createdAt);

		projectData.todos.forEach((todoData) => {
			const todo = new Todo(
				todoData.title,
				todoData.description,
				todoData.priority,
				todoData.dueDate,
				todoData.notes,
			);
			todo.id = todoData.id;
			todo.isComplete = todoData.isComplete;
			todo.createdAt = new Date(todoData.createdAt);

			project.addTodo(todo);
		});
		return project;
	});

	activeProjectId = state.activeProjectId;
};

// ============================= STATISTICS - GLOBAL (dashboard) =============================
export const getGlobalStats = () => {
	const totalProjects = projects.length;
	let totalTodos = 0;
	let completedTodos = 0;
	let pendingTodos = 0;

	projects.forEach((project) => {
		const todos = project.getAllTodos();

		totalTodos += todos.length;
		completedTodos += todos.filter((todo) => todo.isComplete).length;
		pendingTodos += todos.filter((todo) => !todo.isComplete).length;
	});

	return {
		totalProjects,
		totalTodos,
		completedTodos,
		pendingTodos,
	};
};
