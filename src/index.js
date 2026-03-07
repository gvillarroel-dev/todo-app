import "./styles/style.css";
import { initializeApp } from "./modules/appLogic.js";
import { initRouter } from "./router.js";
import { initProjectModalEvents } from "./events/modalEvents.js";

document.addEventListener("DOMContentLoaded", () => {
	console.log("Tasky+ starting...");

	initializeApp();
	initRouter();
	initProjectModalEvents();
});
