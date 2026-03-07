import { getAllProjects, getProjectStats } from "../modules/appLogic.js";
import { createTaskRow, createProjectRow, createEmptyRow } from "../utils/domHelpers.js";
import * as app from "../utils/filterUtils.js";

// ==================== PROJECTS ====================
export const applyProjectsFilter = (filterType, tbodySelector) => {
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

    rerenderProjectsTable(sorted.map(({ project }) => project), tbodySelector);
};

const rerenderProjectsTable = (projects, tbodySelector) => {
    const tbody = document.querySelector(tbodySelector);
    if (!tbody) {
        console.error("Projects table tbody not found");
        return;
    }

    tbody.innerHTML = "";

    if (projects.length === 0) {
        const emptyRow = createEmptyRow(5, "projects");
        tbody.appendChild(emptyRow);
        return;
    }

    projects.forEach((project) => {
        const row = createProjectRow(project);
        tbody.appendChild(row);
    });
};

// ==================== TASKS ====================
export const applyTasksFilter = (filterType) => {
    const projects = getAllProjects();
    const allTasksWithProjects = projects.flatMap((project) =>
        project.getAllTodos().map((todo) => ({
            todo,
            project,
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
        const emptyRow = createEmptyRow(4, "tasks");
        tbody.appendChild(emptyRow);
        return;
    }

    tasks.forEach(({ todo, project }) => {
        const row = createTaskRow(todo, project);
        tbody.appendChild(row);
    });
};

// ==================== Dropdown controls ====================
export const updateDropdownButton = (dropdownSelector, filterName) => {
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

export const closeDropdown = (dropdownSelector) => {
    const dropdown = document.querySelector(dropdownSelector);
    if (!dropdown) return;

    const content = dropdown.querySelector(".dropdown-content");
    const button = dropdown.querySelector(".dropdown-btn");

    if (content) content.setAttribute("hidden", "");
    if (button) button.setAttribute("aria-expanded", "false");
};