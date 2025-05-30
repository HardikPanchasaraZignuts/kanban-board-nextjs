export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: string;
  estimatedHours: number;
  assignees: string[];
  endDate: string;
};
