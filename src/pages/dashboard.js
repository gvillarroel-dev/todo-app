import {
	getGlobalStats,
	getAllProjects,
	getProjectStats,
} from "../modules/appLogic.js";
import {
	createEmptyRow,
	createProjectRow,
	createTaskRow,
} from "../utils/domHelpers.js";

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
		const emptyRow = createEmptyRow(3, "tasks");
		tbody.appendChild(emptyRow);
	} else {
		projects.forEach((project) => {
			const todos = project.getAllTodos();

			todos.forEach((todo) => {
				const row = createTaskRow(todo, project);
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
		const emptyRow = createEmptyRow(4, "projects");
		projectsTbody.appendChild(emptyRow);
	} else {
		projects.forEach((project) => {
			const row = createProjectRow(project);
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
