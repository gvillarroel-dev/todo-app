let currentPage = "dashboard";

import { initDashboardEvents } from "./events/dashboardEvents.js";
import { initProjectsEvents } from "./events/projectsEvents.js";
import { initTasksEvents } from "./events/tasksEvents.js";
import { renderDashboard } from "./pages/dashboard.js";
import { renderProjects } from "./pages/projects.js";
import { renderTasks } from "./pages/tasks.js";

const pages = {
	dashboard: renderDashboard,
	projects: renderProjects,
	tasks: renderTasks,
	notes: null,
};

export const initRouter = () => {
	attachNavigationListeners();
	navigateTo("dashboard");
};

const attachNavigationListeners = () => {
	const buttons = document.querySelectorAll(".menu-btn");
	buttons.forEach((button) => {
		button.addEventListener("click", handleNavigation);
	});
};

const handleNavigation = (event) => {
	const button = event.currentTarget;
	const page = button.dataset.page;

	if (page && page !== currentPage) {
		navigateTo(page);
	}
};

export const navigateTo = (pageName) => {
	if (!pages.hasOwnProperty === pageName) {
		throw new Error(`Page ${pageName} does not exist`);
	}

	currentPage = pageName;
	updateActiveButton(pageName);
	renderPage(pageName);
};

const updateActiveButton = (pageName) => {
	const buttons = document.querySelectorAll(".menu-btn");
	buttons.forEach((button) => {
		if (button.dataset.page === pageName) {
			button.classList.add("active");
		} else {
			button.classList.remove("active");
		}
	});
};

const initPageEvents = (pageName) => {
	if (pageName === "dashboard") {
		initDashboardEvents();
	}
	if (pageName === "projects") {
		initProjectsEvents();
	}
	if (pageName === "tasks") {
		initTasksEvents();
	}
};

const renderPage = (pageName) => {
	const appContainer = document.querySelector("#app");
	const renderFunction = pages[pageName];

	if (renderFunction) {
		appContainer.innerHTML = "";
		appContainer.appendChild(renderFunction());

		initPageEvents(pageName);
	} else {
		appContainer.innerHTML = "PAGE NOT FOUND";
	}
	window.scrollTo(0, 0);
};

export const getCurrentPage = () => {
	return currentPage;
};
