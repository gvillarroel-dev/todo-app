export const filterByPriority = (items) => {
	const priorityOrder = { high: 1, medium: 2, low: 3 };

	return [...items].sort((a, b) => {
		const priorityA = priorityOrder[a.status] || 4;
		const priorityB = priorityOrder[b.status] || 4;
		return priorityA - priorityB;
	});
};

export const filterByOverdue = (items) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return items.filter((item) => {
		const dueDate = new Date(item.dueDate);
		dueDate.setHours(0, 0, 0, 0);

		return today > dueDate;
	});
};

export const filterByOverdueSoon = (items, daysThreshold = 3) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return items.filter((item) => {
		const dueDate = new Date(item.dueDate);
		dueDate.setHours(0, 0, 0, 0);

		// days diff
		const diffInMs = dueDate - today;
		const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

		return diffInDays >= 0 && diffInDays <= daysThreshold;
	});
};

export const sortByStatus = (items) => {
	const statusOrder = {
		"In Progress": 1,
		"Not Started": 2,
		"Completed": 3,
		"Empty": 4,
	};

	return [...items].sort((a, b) => {
		const statusA = statusOrder[a.status] || 999;
		const statusB = statusOrder[b.status] || 999;
		return statusA - statusB;
	});
};

export const sortByProgress = (items, order = "desc") => {
	return [...items].sort((a, b) => {
		const progressA = parseFloat(a.progress) || 0;
		const progressB = parseFloat(b.progress) || 0;
		return order === "desc" ? progressB - progressA : progressA - progressB;
	});
};

export const sortByName = (items, order = "asc") => {
	return [...items].sort((a, b) => {
		const nameA = a.title.toLowerCase();
		const nameB = b.title.toLowerCase();
		return order === "asc"
			? nameA.localeCompare(nameB)
			: nameB.localeCompare(nameA);
	});
};