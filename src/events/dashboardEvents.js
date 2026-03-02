import { initDropdown } from "./dropdownEvents.js";
import { getAllProjects, getProjectStats } from "../modules/appLogic.js";
import {
	createTaskRow,
	createProjectRow,
	createEmptyRow,
} from "../utils/domHelpers.js";
import * as app from "../utils/filterUtils.js";

const applyTasksFilter = (filterType) => {
	const projects = getAllProjects();
	const allTasksWithProjects = projects.flatMap((project) =>
		project.getAllTodos().map((todo) => ({
			todo: todo,
			project: project,
			projectName: project.name,
			projectId: project.id,
		})),
	);

	let filteredTasks;

	if (filterType === "priority") {
		filteredTasks = app.filterByPriority(allTasksWithProjects);
	} else if (filterType === "overdue") {
		filteredTasks = app.filterByOverdue(allTasksWithProjects);
	} else if (filterType === "overdue soon") {
		filteredTasks = app.filterByOverdueSoon(allTasksWithProjects);
	}

	rerenderTasksTable(filteredTasks);
};

const rerenderTasksTable = (tasks) => {
	const tbody = document.querySelector(".tasks-table tbody");

	if (!tbody) {
		console.error("Tasks table tbody not found");
		return;
	}

	tbody.innerHTML = "";

	if (tasks.length === 0) {
		const emptyRow = createEmptyRow(3, "tasks");
		tbody.appendChild(emptyRow);
		return;
	}

	tasks.forEach(({ todo, project }) => {
		const row = createTaskRow(todo, project);
		tbody.appendChild(row);
	});
};

const applyProjectsFilter = (filterType) => {
	const projects = getAllProjects();

	const projectsWithStats = projects.map((project) => ({
		project,
		...getProjectStats(project.id),
	}));

	let sorted;
	if (filterType === "status") {
		sorted = app.sortByStatus(projectsWithStats);
	} else if (filterType === "progress") {
		sorted = app.sortByProgress(projectsWithStats);
	} else if (filterType === "name") {
		sorted = app.sortByName(projectsWithStats);
	}

	rerenderProjectsTable(sorted.map(({ project }) => project));
};

const rerenderProjectsTable = (projects) => {
	const tbody = document.querySelector(".projects-table tbody");
	if (!tbody) {
		console.error("Projects table tbody not found");
		return;
	}

	tbody.innerHTML = "";

	if (projects.length === 0) {
		const emptyRow = createEmptyRow(4, "projects");
		tbody.appendChild(emptyRow);
		return;
	}

	projects.forEach((project) => {
		const row = createProjectRow(project);
		tbody.appendChild(row);
	});
};

const updateDropdownButton = (dropdownSelector, filterName) => {
	const dropdown = document.querySelector(dropdownSelector);

	if (!dropdown) {
		console.error("Dropdown not found", dropdownSelector);
		return;
	}

	const button = dropdown.querySelector(".dropdown-btn");
	if (!button) {
		console.error("Button not found");
		return;
	}

	const formatted = filterName
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	button.textContent = `Filter: ${formatted}`;
};

const closeDropdownInSection = (dropdownSelector) => {
	const dropdown = document.querySelector(dropdownSelector);
	if (!dropdown) return;

	const content = dropdown.querySelector(".dropdown-content");
	const button = dropdown.querySelector(".dropdown-btn");

	if (content) content.setAttribute("hidden", "");
	if (button) button.setAttribute("aria-expanded", "false");
};

export const initDashboardEvents = () => {
	const dropdowns = document.querySelectorAll(".dropdown");
	dropdowns.forEach((dropdown) => initDropdown(dropdown));

	// event listeners: tasks
	const tasksOptions = document.querySelectorAll(
		".tasks-section .filter-option",
	);
	tasksOptions.forEach((option) => {
		option.addEventListener("click", () => {
			const filterType = option.textContent.toLowerCase();

			applyTasksFilter(filterType);
			updateDropdownButton(".tasks-section .dropdown", filterType);
			closeDropdownInSection(".tasks-section .dropdown");
		});
	});

	// event listeners: projects
	const projectsOptions = document.querySelectorAll(
		".projects-section .filter-option",
	);
	projectsOptions.forEach((option) => {
		option.addEventListener("click", () => {
			const filterType = option.textContent.toLowerCase();

			applyProjectsFilter(filterType);
			updateDropdownButton(".projects-section .dropdown", filterType);
			closeDropdownInSection(".projects-section .dropdown");
		});
	});
};
