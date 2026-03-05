import { getAllProjects } from "../modules/appLogic.js";
import { createProjectGroup } from "../utils/domHelpers.js";

export const renderTasks = () => {
	const projects = getAllProjects();

	const container = document.createElement("div");
	container.classList.add("tasks-page");

	const heading = document.createElement("h1");
	heading.classList.add("tasks-heading");
	heading.textContent = "TASKS";

	const button = document.createElement("button");
	button.classList.add("btn-add-task");
	button.textContent = "Add Task";

	const section = document.createElement("section");
	section.classList.add("tasks-groups");

	projects.forEach((project) => {
		const todos = project.getAllTodos();
		const group = createProjectGroup(project, todos);
		section.appendChild(group);
	});

	container.appendChild(heading);
	container.appendChild(button);
	container.appendChild(section);

	return container;
};
