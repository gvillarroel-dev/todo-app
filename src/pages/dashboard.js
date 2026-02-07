import {
	getGlobalStats,
	getAllProjects,
	getProjectStats,
} from "../modules/appLogic.js";

const createFilterDropdown = (id, options) => {
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

const createEmptySection = (section) => {
	const content = document.createElement("div");
	content.classList.add("empty-section");

	const emptyIcon = document.createElement("p");
	emptyIcon.classList.add("empty-icon");

	const heading = document.createElement("h2");
	heading.classList.add("empty-heading");

	if (section === "tasks") {
		emptyIcon.textContent = "~(￣▽￣)~";
		heading.textContent = "No Tasks Yet";
	} else if (section === "projects") {
		emptyIcon.textContent = "_(:з)∠)_";
		heading.textContent = "Projects not found";
	}

	content.appendChild(emptyIcon);
	content.appendChild(heading);

	return content;
};

export const renderDashboard = () => {
	const stats = getGlobalStats();
	const projects = getAllProjects();

	const dashboardContainer = document.createElement("div");
	dashboardContainer.classList.add("dashboard-page");

	const dashboardInit = document.createElement("div");
	dashboardInit.classList.add("dashboard-banner");

	const bannerHeading = document.createElement("h1");
	bannerHeading.classList.add("banner-heading");
	bannerHeading.textContent = "Hello, There! 👋🏻";

	dashboardInit.appendChild(bannerHeading);

	// stats container
	const statsContainer = document.createElement("div");
	statsContainer.classList.add("dashboard-stats");

	// stats cards
	for (let [name, value] of Object.entries(stats)) {
		const card = document.createElement("div");
		card.classList.add("stats-card");

		const cardHeading = document.createElement("h2");
		cardHeading.classList.add("stats-heading");
		cardHeading.textContent = name.split(/(?=[A-Z])/).join(" ");

		const cardStats = document.createElement("p");
		cardStats.classList.add("stats-number");
		cardStats.textContent = value;

		card.appendChild(cardHeading);
		card.appendChild(cardStats);

		statsContainer.appendChild(card);
	}

	// tasks section
	const tasksSection = document.createElement("section");
	tasksSection.classList.add("tasks-section");

	const tasksHeading = document.createElement("h2");
	tasksHeading.classList.add("tasks-heading");
	tasksHeading.id = "tasks-heading";
	tasksHeading.textContent = "Due Tasks";

	const tasksDropdown = createFilterDropdown("tasks-filter-dropdown", [
		"priority",
		"overdue",
		"overdue soon",
	]);

	const tasksContent = document.createElement("table");
	tasksContent.classList.add("tasks-table");

	const tasksHeaders = ["Task Name", "Project Name", "Due"];
	const thead = document.createElement("thead");
	const headerRow = document.createElement("tr");

	tasksHeaders.forEach((header) => {
		const th = document.createElement("th");
		th.textContent = header;
		th.scope = "col";
		headerRow.appendChild(th);
	});

	thead.appendChild(headerRow);
	tasksContent.appendChild(thead);

	const tbody = document.createElement("tbody");

	const totalTasks = projects.reduce((sum, project) => {
		return sum + project.getAllTodos().length;
	}, 0);

	// empty content
	if (totalTasks === 0) {
		const emptyRow = document.createElement("tr");
		emptyRow.classList.add("empty-row");

		const emptyCell = document.createElement("td");
		emptyCell.setAttribute("colspan", "3");
		emptyCell.classList.add("empty-cell");

		const emptyContent = createEmptySection("tasks");
		emptyCell.appendChild(emptyContent);

		emptyRow.appendChild(emptyCell);
		tbody.appendChild(emptyRow);
	} else {
		projects.forEach((project) => {
			const todos = project.getAllTodos();

			todos.forEach((todo) => {
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

				tbody.appendChild(row);
			});
		});
	}

	tasksContent.appendChild(tbody);

	tasksSection.appendChild(tasksHeading);
	tasksSection.appendChild(tasksDropdown);
	tasksSection.appendChild(tasksContent);

	// projects section
	const projectsSection = document.createElement("section");
	projectsSection.classList.add("projects-section");
	projectsSection.setAttribute("aria-labelledby", "projects-heading");

	const projectsHeading = document.createElement("h2");
	projectsHeading.classList.add("heading-section");
	projectsHeading.id = "projects-heading";
	projectsHeading.textContent = "Projects List";

	// dropdow
	const projectsDropdown = createFilterDropdown("projects-filter-dropdown", [
		"status",
		"progress",
		"name",
	]);

	const projectsContent = document.createElement("table");
	projectsContent.classList.add("projects-table");

	const projectsHeaders = [
		"Project Name",
		"Status",
		"Progress",
		"Total Tasks",
	];
	const projectsThead = document.createElement("thead");
	const projectsHeaderRow = document.createElement("tr");

	projectsHeaders.forEach((header) => {
		const th = document.createElement("th");
		th.textContent = header;
		th.scope = "col";
		projectsHeaderRow.appendChild(th);
	});

	projectsThead.appendChild(projectsHeaderRow);
	projectsContent.appendChild(projectsThead);

	const projectsTbody = document.createElement("tbody");

	if (projects.length === 0) {
		const emptyRow = document.createElement("tr");
		emptyRow.classList.add("empty-row");

		const emptyCell = document.createElement("td");
		emptyCell.setAttribute("colspan", "4");
		emptyCell.classList.add("empty-cell");

		const emptyContent = createEmptySection("projects");
		emptyCell.appendChild(emptyContent);

		emptyRow.appendChild(emptyCell);
		projectsTbody.appendChild(emptyRow);
	} else {
		projects.forEach((item) => {
			const project = getProjectStats(item.id);

			const row = document.createElement("tr");
			row.classList.add("project-row");
			row.setAttribute("data-status", project.status);
			row.setAttribute("data-progress", project.completionPercentage);
			row.setAttribute("data-project-id", item.id);

			// proj Name
			const projectCell = document.createElement("td");
			const projectButton = document.createElement("button");
			projectButton.classList.add("project-link");
			projectButton.setAttribute("data-project-id", item.id);

			const projectIcon = document.createElement("span");
			projectIcon.classList.add("project-icon");
			projectIcon.setAttribute("aria-hidden", "true");
			projectIcon.textContent = "📁";

			const projectName = document.createElement("span");
			projectName.classList.add("project-name");
			projectName.textContent = project.projectName;

			projectButton.appendChild(projectIcon);
			projectButton.appendChild(projectName);
			projectCell.appendChild(projectButton);

			// status cell
			const statusCell = document.createElement("td");
			statusCell.classList.add("project-status");

			if (project.status === "Not Started") {
				statusCell.classList.add("not-started");
			} else if (project.status === "Empty") {
				statusCell.classList.add("empty");
			} else if (project.status === "Completed") {
				statusCell.classList.add("completed");
			} else {
				statusCell.classList.add("in-progress");
			}
			statusCell.textContent = project.status;

			// progress cell
			const progressCell = document.createElement("td");
			progressCell.classList.add("project-progress");
			progressCell.textContent = `${project.completionPercentage}%`;

			// totalTasks cell
			const tasksCell = document.createElement("td");
			tasksCell.classList.add("project-total-tasks");
			tasksCell.textContent = `${project.completedTodos}/${project.totalTodos}`;

			row.appendChild(projectCell);
			row.appendChild(statusCell);
			row.appendChild(progressCell);
			row.appendChild(tasksCell);

			projectsTbody.appendChild(row);
		});
	}

	projectsContent.appendChild(projectsTbody);

	projectsSection.appendChild(projectsHeading);
	projectsSection.appendChild(projectsDropdown);
	projectsSection.appendChild(projectsContent);

	// append to dashboard container
	dashboardContainer.appendChild(dashboardInit);
	dashboardContainer.appendChild(statsContainer);
	dashboardContainer.appendChild(tasksSection);
	dashboardContainer.appendChild(projectsSection);

	return dashboardContainer;
};
