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
