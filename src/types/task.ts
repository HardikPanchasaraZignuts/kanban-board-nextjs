export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  estimatedHours: number;
  assignees: string[];
  endDate: string;
};
