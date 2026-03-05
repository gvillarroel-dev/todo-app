import { getProject, getTodo } from "../modules/appLogic.js";
import { createTaskDetailRow } from "../utils/domHelpers.js";
import { initTaskModalEvents } from "./modalEvents.js";

export const initTasksEvents = () => {
	const headers = document.querySelectorAll(".project-group__header");
	headers.forEach((header) => {
		header.addEventListener("click", () => {
			const table = header.nextElementSibling;
			table.toggleAttribute("hidden");

			const span = header.querySelector("span");
			span.classList.toggle("collapsed");
		});
	});

	// details-expansion
	const tasksGroups = document.querySelector(".tasks-groups");
	tasksGroups.addEventListener("click", (e) => {
		const row = e.target.closest(".task-row");
		if (!row) return;

		const taskId = row.dataset.taskId;
		const projectId = row.dataset.projectId;
		const todo = getTodo(projectId, taskId);
		const project = getProject(projectId);

		const existingDetail = row.nextElementSibling;
		if (existingDetail && existingDetail.classList.contains("task-detail-row")) {
			existingDetail.remove();
		} else {
			const detailRow = createTaskDetailRow(todo, project);
			row.insertAdjacentElement("afterend", detailRow);
		}
	});

	initTaskModalEvents();
};
