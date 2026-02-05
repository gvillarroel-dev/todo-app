import "./styles/style.css";
import { initializeApp } from "./modules/appLogic.js";
import { initRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
	console.log("Tasky+ starting...");

	initializeApp();
	initRouter();
});
