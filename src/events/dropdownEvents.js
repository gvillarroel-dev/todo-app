export const initDropdown = (dropdownElement) => {
	const button = dropdownElement.querySelector(".dropdown-btn");
	const content = dropdownElement.querySelector(".dropdown-content");

	if (!button || !content) return;

	const openDropdown = () => {
		content.removeAttribute("hidden");
		content.classList.add("show");
		button.setAttribute("aria-expanded", "true");
	};

	const closeDropdown = () => {
		content.classList.remove("show");
		content.setAttribute("hidden", "");
		button.setAttribute("aria-expanded", "false");
	};

	const toggleDropdown = (event) => {
		event.stopPropagation();
		const isExpanded = button.getAttribute("aria-expanded") === "true";

		if (isExpanded) {
			closeDropdown();
		} else {
			openDropdown();
		}
	};

	const handleOutsideClick = (event) => {
		const isExpanded = button.getAttribute("aria-expanded") === "true";

		if (isExpanded && !dropdownElement.contains(event.target)) {
			closeDropdown();
		}
	};

	const handleEscape = (event) => {
		if (event.key === "Escape") {
			const isExpanded = button.getAttribute("aria-expanded") === "true";

			if (isExpanded) {
				closeDropdown();
				button.focus();
			}
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
