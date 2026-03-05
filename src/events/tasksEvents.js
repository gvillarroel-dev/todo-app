import { deleteTodo, getAllProjects, getProject, getTodo, toggleTodoComplete, updateTodo } from "../modules/appLogic.js";
import { createEmptyRow, createTaskDetailRow, createTaskModal, createTaskRow } from "../utils/domHelpers.js";
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
        
        // task edit event
        const editBtn = e.target.closest(".task-detail__btn--edit");
        if (editBtn) {
            const taskId = editBtn.dataset.taskId;
            const projectId = editBtn.dataset.projectId;
            const todo = getTodo(projectId, taskId);
            
            const modal = createTaskModal(todo, getAllProjects());
            document.body.appendChild(modal);
            modal.showModal();

            modal.addEventListener("close", () => {
                modal.remove();
            });

            const form = modal.querySelector(".task-modal__form");
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const newData = {
                    title: form.querySelector("#task-name").value.trim(),
                    description: form.querySelector("#task-description").value.trim(),
                    priority: form.querySelector("#task-priority").value,
                    dueDate: form.querySelector("#task-dueDate").value,
                    notes: form.querySelector("#task-notes").value.trim(),
                };
                if (!newData.title) return;
                updateTodo(projectId, taskId, newData);
                
                const project = getProject(projectId);
                const group = document.querySelector(`article[data-project-id="${projectId}"]`);
                const tbody = group.querySelector("tbody");
                tbody.innerHTML = "";
                project.getAllTodos().forEach((todo) => {
                    tbody.appendChild(createTaskRow(todo, project));
                });
                
                modal.close();
            });

            return;
        };

        // delete task
        const deleteBtn = e.target.closest(".task-detail__btn--delete");
        if (deleteBtn) {
            const taskId = deleteBtn.dataset.taskId;
            const projectId = deleteBtn.dataset.projectId;
            deleteTodo(projectId, taskId);

            const project = getProject(projectId);
            const group = document.querySelector(`article[data-project-id="${projectId}"]`);
            const tbody = group.querySelector("tbody");
            tbody.innerHTML = "";

            const remainingTodos = project.getAllTodos();
            if (remainingTodos.length === 0) {
                const emptyRow = createEmptyRow(3, "tasks");
                tbody.appendChild(emptyRow);
            } else {
                remainingTodos.forEach((todo) => {
                    tbody.appendChild(createTaskRow(todo, project));
                });
            }

            return;
        };

        // complete task event
        const toggleBtn = e.target.closest(".task-detail__btn--toggle");
        if (toggleBtn) {
            const taskId = toggleBtn.dataset.taskId;
            const projectId = toggleBtn.dataset.projectId;
            toggleTodoComplete(projectId, taskId);

            const updatedTodo = getTodo(projectId, taskId);
            toggleBtn.textContent = updatedTodo.isComplete ? "Mark Incomplete" : "Mark Complete";
        }

        // task row click
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
