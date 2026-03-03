import { createProject } from "../modules/appLogic.js";
import { createProjectModal, createProjectRow } from "../utils/domHelpers.js";

export const initProjectModalEvents = () => {
	const modal = createProjectModal();
	document.body.appendChild(modal);

	const addProjectBtn = document.querySelector(".btn-new-project");
	addProjectBtn.addEventListener("click", () => {
		modal.showModal();
	});

	const cancelModal = modal.querySelector(".project-modal__btn--cancel");
	cancelModal.addEventListener("click", () => {
		modal.close();
	});

	const form = modal.querySelector(".project-modal form");
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const projectName = modal.querySelector(".project-modal__input").value.trim();
        if (!projectName) return;

		const project = createProject(projectName);
		const row = createProjectRow(project);
		document.querySelector(".projects-table tbody").appendChild(row);
		modal.close();
		form.reset();
	});
};
