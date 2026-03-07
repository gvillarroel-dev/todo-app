import { deleteNote } from "../modules/appLogic.js";
import { initNoteModalEvents } from "./modalEvents.js";

export const initNotesEvents = () => {
	initNoteModalEvents();

	const notesGrid = document.querySelector(".notes-grid");
	notesGrid.addEventListener("click", (e) => {
		const deleteBtn = e.target.closest(".note-card__btn--delete");
		if (!deleteBtn) return;

		const noteId = deleteBtn.dataset.noteId;
		deleteNote(noteId);

		const card = deleteBtn.closest(".note-card");
		card.remove();

		if (notesGrid.children.length === 0) {
			const emptyIcon = document.createElement("span");
			emptyIcon.classList.add("notes-empty__icon");
			emptyIcon.textContent = "~(￣▽￣)~";

			const emptyText = document.createElement("p");
			emptyText.classList.add("notes-empty");
			emptyText.textContent = "No notes yet";

			notesGrid.appendChild(emptyIcon);
			notesGrid.appendChild(emptyText);
		}
	});
};
