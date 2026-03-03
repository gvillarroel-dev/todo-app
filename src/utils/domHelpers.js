import { getProjectStats } from "../modules/appLogic";

// ======================= CREATE DINAMIC TASK ROWS =======================
export const createTaskRow = (todo, project) => {
	const row = document.createElement("tr");
	row.classList.add("task-row");
	row.setAttribute("data-priority", todo.priority);
	row.setAttribute("data-due-date", todo.dueDate);
	row.setAttribute("data-project-id", project.id);

	// name cell
	const taskCell = document.createElement("td");
	const taskButton = document.createElement("button");
	taskButton.classList.add("task-link");
	taskButton.setAttribute("data-task-id", todo.id);

	const taskIcon = document.createElement("span");
	taskIcon.classList.add("task-icon");
	taskIcon.setAttribute("aria-hidden", "true");
	taskIcon.textContent = "📝";

	const taskName = document.createElement("span");
	taskName.classList.add("task-name");
	taskName.textContent = todo.title;

	taskButton.appendChild(taskIcon);
	taskButton.appendChild(taskName);
	taskCell.appendChild(taskButton);

	// projectName cell
	const projectCell = document.createElement("td");
	projectCell.classList.add("task-project");
	projectCell.textContent = project.name;

	// dueDate cell
	const dateCell = document.createElement("td");
	dateCell.classList.add("task-date");
	dateCell.textContent = todo.dueDate;

	row.appendChild(taskCell);
	row.appendChild(projectCell);
	row.appendChild(dateCell);

	return row;
};

// ======================= CREATE DINAMIC PROJECT ROWS =======================
export const createProjectRow = (project) => {
	const row = document.createElement("tr");
	row.classList.add("project-row");
	row.setAttribute("data-status", project.status);
	row.setAttribute("data-progress", project.completionPercentage);
	row.setAttribute("data-project-id", project.id);

	// proj Name
	const projectCell = document.createElement("td");
	const projectButton = document.createElement("button");
	projectButton.classList.add("project-link");
	projectButton.setAttribute("data-project-id", project.id);

	const projectIcon = document.createElement("span");
	projectIcon.classList.add("project-icon");
	projectIcon.setAttribute("aria-hidden", "true");
	projectIcon.textContent = "📁";

	const projectName = document.createElement("span");
	projectName.classList.add("project-name");
	projectName.textContent = project.name;

	projectButton.appendChild(projectIcon);
	projectButton.appendChild(projectName);
	projectCell.appendChild(projectButton);

	// projects stats
	const projectStats = getProjectStats(project.id);

	// status cell
	const statusCell = document.createElement("td");
	statusCell.classList.add("project-status");

	if (projectStats.status === "Not Started") {
		statusCell.classList.add("not-started");
	} else if (projectStats.status === "Empty") {
		statusCell.classList.add("empty");
	} else if (projectStats.status === "Completed") {
		statusCell.classList.add("completed");
	} else {
		statusCell.classList.add("in-progress");
	}
	statusCell.textContent = projectStats.status;

	// progress cell
	const progressCell = document.createElement("td");
	progressCell.classList.add("project-progress");
	progressCell.textContent = `${projectStats.completionPercentage}%`;

	// totalTasks cell
	const tasksCell = document.createElement("td");
	tasksCell.classList.add("project-total-tasks");
	tasksCell.textContent = `${projectStats.completedTodos}/${projectStats.totalTodos}`;

	row.appendChild(projectCell);
	row.appendChild(statusCell);
	row.appendChild(progressCell);
	row.appendChild(tasksCell);

	return row;
};

// ======================= CREATE DINAMIC EMPTY SECTION =======================
export const createEmptyRow = (colspan, sectionType) => {
	const emptyRow = document.createElement("tr");
	emptyRow.classList.add("empty-row");

	const emptyCell = document.createElement("td");
	emptyCell.setAttribute("colspan", colspan);
	emptyCell.classList.add("empty-cell");

	const heading = document.createElement("h2");
	heading.classList.add("empty-heading");

	const emptyIcon = document.createElement("p");
	emptyIcon.classList.add("empty-icon");

	if (sectionType === "tasks") {
		emptyIcon.textContent = "~(￣▽￣)~";
		heading.textContent = "No Tasks Yet";
	} else if (sectionType === "projects") {
		emptyIcon.textContent = "_(:з)∠)_";
		heading.textContent = "Projects not found";
	}

	emptyCell.appendChild(emptyIcon);
	emptyCell.appendChild(heading);
	emptyRow.appendChild(emptyCell);

	return emptyRow;
};

// ======================= CREATE DINAMIC PROJECT MODAL =======================
export const createProjectModal = () => {
	const modal = document.createElement("dialog");
	modal.classList.add("project-modal");

	const form = document.createElement("form");

	const heading = document.createElement("h2");
	heading.classList.add("project-modal__heading");
	heading.textContent = "Add New Project";

	const input = document.createElement("input");
	input.classList.add("project-modal__input");
	input.type = "text";
	input.name = "projectName";
	input.placeholder = "Project name";

	const submitBtn = document.createElement("button");
	submitBtn.classList.add("project-modal__btn--submit");
	submitBtn.type = "submit";
	submitBtn.textContent = "Create";

	const cancelBtn = document.createElement("button");
	cancelBtn.classList.add("project-modal__btn--cancel");
	cancelBtn.type = "button";
	cancelBtn.textContent = "Cancel";

	form.appendChild(heading);
	form.appendChild(input);
	form.appendChild(submitBtn);
	form.appendChild(cancelBtn);
	modal.appendChild(form);

	return modal;
};

// ========================= DROPDOWN FILTER =========================
export const createFilterDropdown = (id, options) => {
	const container = document.createElement("div");
	container.classList.add("dropdown");

	const button = document.createElement("button");
	button.classList.add("dropdown-btn");
	button.textContent = "Filter";
	button.setAttribute("aria-haspopup", "true");
	button.setAttribute("aria-expanded", "false");
	button.setAttribute("aria-controls", id);

	const content = document.createElement("div");
	content.classList.add("dropdown-content");
	content.setAttribute("role", "menu");
	content.setAttribute("hidden", "");
	content.id = id;

	options.forEach((option) => {
		const optionBtn = document.createElement("button");
		optionBtn.classList.add("filter-option");
		optionBtn.setAttribute("role", "menuitem");
		optionBtn.textContent = option;
		content.appendChild(optionBtn);
	});

	container.appendChild(button);
	container.appendChild(content);

	return container;
};
