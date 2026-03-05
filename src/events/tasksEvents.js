import { initTaskModalEvents } from "./modalEvents";

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

    initTaskModalEvents();
};
