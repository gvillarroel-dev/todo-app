import { getProjectStats } from "../modules/appLogic";
import { formatDate } from "./dateFormatter";

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

	// createdAt cell
	const createdAtCell = document.createElement("td");
	createdAtCell.classList.add("project-date");
	createdAtCell.textContent = formatDate(project.createdAt);

	row.appendChild(projectCell);
	row.appendChild(statusCell);
	row.appendChild(progressCell);
	row.appendChild(tasksCell);
	row.appendChild(createdAtCell);

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

	const label = document.createElement("label");
	label.setAttribute("for", "project-name");
	label.textContent = "Project Name";

	const input = document.createElement("input");
	input.classList.add("project-modal__input");
	input.id = "project-name";
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
	form.appendChild(label);
	form.appendChild(input);
	form.appendChild(submitBtn);
	form.appendChild(cancelBtn);
	modal.appendChild(form);

	return modal;
};

// ======================= CREATE DINAMIC TASK MODAL =======================
export const createTaskModal = (task = null, projects = []) => {
    const modal = document.createElement("dialog");
    modal.classList.add("task-modal");

    const form = document.createElement("form");
    form.classList.add("task-modal__form");

    const heading = document.createElement("h2");
    heading.classList.add("task-modal__heading");
    heading.textContent = task ? "Edit Task" : "Add New Task";

    const nameLabel = document.createElement("label");
    nameLabel.classList.add("task-modal__label");
    nameLabel.setAttribute("for", "task-name");
    nameLabel.textContent = "Task Name";

    const taskName = document.createElement("input");
    taskName.classList.add("task-modal__input");
    taskName.id = "task-name";
    taskName.type = "text";
    taskName.name = "task-name";
    taskName.placeholder = "Ej: Do something...";
    if (task) taskName.value = task.title;

    const descriptionLabel = document.createElement("label");
    descriptionLabel.classList.add("task-modal__label");
    descriptionLabel.setAttribute("for", "task-description");
    descriptionLabel.textContent = "Description";

    const taskDescription = document.createElement("textarea");
    taskDescription.classList.add("task-modal__textarea");
    taskDescription.id = "task-description";
    taskDescription.name = "task-description";
    taskDescription.rows = 5;
    taskDescription.placeholder = "Write something...";
    if (task) taskDescription.value = task.description;

    const dateLabel = document.createElement("label");
    dateLabel.classList.add("task-modal__label");
    dateLabel.setAttribute("for", "task-dueDate");
    dateLabel.textContent = "Expiration Date";

    const taskDue = document.createElement("input");
    taskDue.classList.add("task-modal__input");
    taskDue.type = "date";
    taskDue.id = "task-dueDate";
    taskDue.name = "task-dueDate";
    if (task) taskDue.value = task.dueDate;

    const priorityLabel = document.createElement("label");
    priorityLabel.classList.add("task-modal__label");
    priorityLabel.setAttribute("for", "task-priority");
    priorityLabel.textContent = "Task Priority";

    const taskPriority = document.createElement("select");
    taskPriority.classList.add("task-modal__select");
    taskPriority.id = "task-priority";
    taskPriority.name = "task-priority";

    const priorityOptions = ["high", "medium", "low"];
    priorityOptions.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        if (task && task.priority === option) opt.selected = true;
        taskPriority.appendChild(opt);
    });

    const notesLabel = document.createElement("label");
    notesLabel.classList.add("task-modal__label");
    notesLabel.setAttribute("for", "task-notes");
    notesLabel.textContent = "Notes";

    const taskNotes = document.createElement("textarea");
    taskNotes.classList.add("task-modal__textarea");
    taskNotes.id = "task-notes";
    taskNotes.name = "task-notes";
    taskNotes.rows = 5;
    taskNotes.placeholder = "Something to remember?";
    if (task) taskNotes.value = task.notes;

    // project
    const projectLabel = document.createElement("label");
    projectLabel.classList.add("task-modal__label");
    projectLabel.setAttribute("for", "task-project");
    projectLabel.textContent = "Project";

    const taskProject = document.createElement("select");
    taskProject.classList.add("task-modal__select");
    taskProject.id = "task-project";
    taskProject.name = "task-project";

    projects.forEach((project) => {
        const opt = document.createElement("option");
        opt.value = project.id;
        opt.textContent = project.name;
        if (task && task.projectId === project.id) opt.selected = true;
        taskProject.appendChild(opt);
    });

    // btn
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("task-modal__btn", "task-modal__btn--submit");
    submitBtn.type = "submit";
    submitBtn.textContent = task ? "Save Changes" : "Add Task";

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("task-modal__btn", "task-modal__btn--cancel");
    cancelBtn.type = "button";
    cancelBtn.textContent = "cancel";

    form.appendChild(heading);
    form.appendChild(nameLabel);
    form.appendChild(taskName);
    form.appendChild(descriptionLabel);
    form.appendChild(taskDescription);
    form.appendChild(dateLabel);
    form.appendChild(taskDue);
    form.appendChild(priorityLabel);
    form.appendChild(taskPriority);
    form.appendChild(notesLabel);
    form.appendChild(taskNotes);
    form.appendChild(projectLabel);
    form.appendChild(taskProject);
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

// ========================= PROJECT-GROUP =========================
export const createProjectGroup = (project, todos) => {
	const article = document.createElement("article");
	article.classList.add("project-group");
	article.setAttribute("data-project-id", project.id);

	const header = document.createElement("header");
	header.classList.add("project-group__header");

	const span = document.createElement("span");
	span.textContent = "⟪";

	const projectHeading = document.createElement("h2");
	projectHeading.textContent = project.name;

	header.appendChild(span);
	header.appendChild(projectHeading);

	const table = document.createElement("table");
	table.classList.add("tasks-table");

	const headers = ["Task Name", "Project Name", "Due"];
	const thead = document.createElement("thead");
	const headerRow = document.createElement("tr");

	headers.forEach((headerCell) => {
		const th = document.createElement("th");
		th.textContent = headerCell;
		th.scope = "col";
		headerRow.appendChild(th);
	});

	thead.appendChild(headerRow);
	table.appendChild(thead);

	const tbody = document.createElement("tbody");

	// empty content
	if (todos.length === 0) {
		const emptyRow = createEmptyRow(3, "tasks");
		tbody.appendChild(emptyRow);
	} else {
		todos.forEach((todo) => {
			const row = createTaskRow(todo, project);
			tbody.appendChild(row);
		});
	}

	table.appendChild(tbody);

	article.appendChild(header);
	article.appendChild(table);

	return article;
};
