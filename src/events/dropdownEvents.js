export const initDropdown = (dropdownElement) => {
	const button = dropdownElement.querySelector(".dropdown-btn");
	const content = dropdownElement.querySelector(".dropdown-content");

	if (!button || !content) return;

	const toggleDropdown = (event) => {
		event.stopPropagation();
		const isExpanded = button.getAttribute("aria-expanded") === "true";

		button.setAttribute("aria-expanded", !isExpanded);
		content.toggleAttribute("hidden");
	};

	const closeDropdown = () => {
		button.setAttribute("aria-expanded", "false");
		content.setAttribute("hidden", "true");
	};

	const handleOutsideClick = (event) => {
		if (
			!content.hasAttribute("hidden") &&
			!dropdownElement.contains(event.target)
		) {
			closeDropdown();
		}
	};

	const handleEscape = (event) => {
		if (event.key === "Escape" && !content.hasAttribute("hidden")) {
			closeDropdown();
		}
	};

	// listeners
	button.addEventListener("click", toggleDropdown);
	document.addEventListener("click", handleOutsideClick);
	document.addEventListener("keydown", handleEscape);

	return () => {
		button.removeEventListener("click", toggleDropdown);
		document.removeEventListener("click", handleOutsideClick);
		document.removeEventListener("keydown", handleEscape);
	};
};
