// Get priority badge color
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-700";
    case "medium":
      return "bg-yellow-600";
    case "low":
      return "bg-green-700";
    default:
      return "bg-gray-500";
  }
};
