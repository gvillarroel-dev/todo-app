import { applyProjectsFilter, updateDropdownButton, closeDropdown } from "../utils/filterControls.js";
import { initDropdown } from "./dropdownEvents.js";

export const initProjectsEvents = () => {
    const dropdowns = document.querySelectorAll(".projects-section .dropdown");
    dropdowns.forEach((dropdown) => initDropdown(dropdown));

    const projectsOptions = document.querySelectorAll(".projects-section .filter-option");
    projectsOptions.forEach((option) => {
        option.addEventListener("click", () => {
            const filterType = option.textContent.toLowerCase();

            applyProjectsFilter(filterType, ".projects-section .projects-table tbody");
            updateDropdownButton(".projects-section .dropdown", filterType);
            closeDropdown(".projects-section .dropdown");
        });
    });
};