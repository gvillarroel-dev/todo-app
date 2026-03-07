import {
	createNote,
	createProject,
	createTodo,
	getAllProjects,
} from "../modules/appLogic.js";
import {
	createNoteCard,
	createNoteModal,
	createProjectModal,
	createProjectRow,
	createTaskModal,
	createTaskRow,
} from "../utils/domHelpers.js";

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


export const initTaskModalEvents = () => {
	const modal = createTaskModal(null, getAllProjects());
	document.body.appendChild(modal);

	const addTaskBtn = document.querySelector(".btn-add-task");
	addTaskBtn.addEventListener("click", () => {
		modal.showModal();
		console.log("open");
	});

	const cancelModal = modal.querySelector(".task-modal__btn--cancel");
	cancelModal.addEventListener("click", () => {
		modal.close();
	});

	const form = modal.querySelector(".task-modal__form");
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const projectId = form.querySelector("#task-project").value;
		const todoData = {
			title: form.querySelector("#task-name").value.trim(),
			description: form.querySelector("#task-description").value.trim(),
			priority: form.querySelector("#task-priority").value,
			dueDate: form.querySelector("#task-dueDate").value,
			notes: form.querySelector("#task-notes").value.trim(),
		};

		if (!todoData.title) return;
		const todo = createTodo(projectId, todoData);

		const group = document.querySelector(`article[data-project-id="${projectId}"]`);
		if (group) {
			const tbody = group.querySelector("tbody");
			const emptyRow = tbody.querySelector(".empty-row");
			if (emptyRow) {
				tbody.removeChild(emptyRow);
			}

			const row = createTaskRow(todo, getAllProjects().find(project => project.id === projectId));
			tbody.appendChild(row);
		}

		modal.close();
		form.reset();
	});
};

export const initNoteModalEvents = () => {
	const modal = createNoteModal();
	document.body.appendChild(modal);

	const createNoteBtn = document.querySelector(".btn-add-note");
	createNoteBtn.addEventListener("click", () => {
		modal.showModal();
	});

	const cancelBtn = modal.querySelector(".note-modal__btn--cancel");
	cancelBtn.addEventListener("click", () => {
		modal.close();
	});

	const form = modal.querySelector(".note-modal__form");
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const content = modal.querySelector("#note-content").value.trim();
		if (!content) return;

		const note = createNote(content);
		const card = createNoteCard(note);

		const container = document.querySelector(".notes-grid");
		container.appendChild(card);

		modal.close();
		form.reset();
	});
};
