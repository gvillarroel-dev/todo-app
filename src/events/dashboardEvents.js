import { applyProjectsFilter, applyTasksFilter, closeDropdown, updateDropdownButton } from "../utils/filterControls.js";
import { initDropdown } from "./dropdownEvents.js";

export const initDashboardEvents = () => {
	const dropdowns = document.querySelectorAll(".dropdown");
	dropdowns.forEach((dropdown) => initDropdown(dropdown));

	// event listeners: tasks
	const tasksOptions = document.querySelectorAll(".tasks-section .filter-option");
	tasksOptions.forEach((option) => {
		option.addEventListener("click", () => {
			const filterType = option.textContent.toLowerCase();

			applyTasksFilter(filterType, ".tasks-section .tasks-table tbody");
			updateDropdownButton(".tasks-section .dropdown", filterType);
			closeDropdown(".tasks-section .dropdown");
		});
	});

	// event listeners: projects
	const projectsOptions = document.querySelectorAll(".projects-section .filter-option");
	projectsOptions.forEach((option) => {
		option.addEventListener("click", () => {
			const filterType = option.textContent.toLowerCase();

			applyProjectsFilter(filterType, ".projects-section .projects-table tbody");
			updateDropdownButton(".projects-section .dropdown", filterType);
			closeDropdown(".projects-section .dropdown");
		});
	});
};
