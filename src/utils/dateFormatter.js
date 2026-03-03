export const formatDate = (date, options = {}) => {
    if (!date) return "N/A";
    const defaultOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    return new Date(date).toLocaleDateString("en-EN", { ...defaultOptions, ...options });
};
