import { deleteProject, getProject } from "../modules/appLogic.js";
import { createProjectDetailRow } from "../utils/domHelpers.js";
import {
	applyProjectsFilter,
	applyTasksFilter,
	closeDropdown,
	updateDropdownButton,
} from "../utils/filterControls.js";
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

	const projectsSection = document.querySelector(".projects-section");
	projectsSection.addEventListener("click", (e) => {
		const deleteBtn = e.target.closest(".project-detail__btn--delete");
		if (deleteBtn) {
			const projectId = deleteBtn.dataset.projectId;
			const detailRow = deleteBtn.closest(".project-detail-row");
			const row = detailRow.previousElementSibling;

			try {
				deleteProject(projectId);
				row.remove();
				detailRow.remove();
			} catch (error) {
				const message = detailRow.querySelector(".project-detail__message");
				
				if (message) {
					message.textContent = error.message;
				} else {
					const p = document.createElement("p");
					p.classList.add("project-detail__message");
					p.textContent = error.message;
					detailRow.querySelector(".project-detail").appendChild(p);
				}
			}

			return;
		}

		const row = e.target.closest(".project-row");
		if (!row) return;

		const projectId = row.dataset.projectId;
		const project = getProject(projectId);
		const existingDetail = row.nextElementSibling;

		if (existingDetail && existingDetail.classList.contains("project-detail-row")) {
			existingDetail.remove();
		} else {
			const detailRow = createProjectDetailRow(project);
			row.insertAdjacentElement("afterend", detailRow);
		}
	});
};
