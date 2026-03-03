import { getAllProjects, getGlobalStats } from "../modules/appLogic.js";
import {
	createEmptyRow,
	createFilterDropdown,
	createProjectRow,
} from "../utils/domHelpers.js";

export const renderProjects = () => {
	const stats = getGlobalStats();
	const projects = getAllProjects();

	const projectsContainer = document.createElement("div");
	projectsContainer.classList.add("projects-page");

	const heading = document.createElement("h2");
	heading.classList.add("projects-heading");
	heading.textContent = "Projects";

	// ========== Projects Stats ==========
	const statsContainer = document.createElement("div");
	statsContainer.classList.add("projects-stats");

	for (let [name, value] of Object.entries(stats)) {
		if (name === "completedTodos") {
			continue;
		}

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

	// ========== Projects Table ==========
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
		"Created At",
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
		const emptyRow = createEmptyRow(5, "projects");
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

	projectsContainer.appendChild(heading);
	projectsContainer.appendChild(statsContainer);
	projectsContainer.appendChild(projectsSection);

	return projectsContainer;
};
