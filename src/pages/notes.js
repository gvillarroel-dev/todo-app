import { getAllNotes } from "../modules/appLogic.js";
import { createNoteCard } from "../utils/domHelpers";

export const renderNotes = () => {
	const notes = getAllNotes();

	const container = document.createElement("div");
	container.classList.add("notes-page");

	const h1 = document.createElement("h1");
	h1.classList.add("notes-heading");
	h1.textContent = "Notes";

	const button = document.createElement("button");
	button.classList.add("btn-add-note");
	button.textContent = "Add Note";

	const section = document.createElement("section");
	section.classList.add("notes-grid");

	if (notes.length === 0) {
		const emptyIcon = document.createElement("span");
		emptyIcon.classList.add("notes-empty__icon");
		emptyIcon.textContent = "~(￣▽￣)~";

		const emptyText = document.createElement("p");
		emptyText.classList.add("notes-empty");
		emptyText.textContent = "No notes yet";

		section.appendChild(emptyIcon);
		section.appendChild(emptyText);
	} else {
		notes.forEach((note) => {
			const card = createNoteCard(note);
			section.appendChild(card);
		});
	}

	container.appendChild(h1);
	container.appendChild(button);
	container.appendChild(section);

	return container;
};
