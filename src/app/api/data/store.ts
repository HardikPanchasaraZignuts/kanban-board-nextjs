import { Task } from "@/types/task";
import { v4 as uuid } from "uuid";

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const globalBoard = (globalThis as any).board || [
  {
    id: uuid(),
    title: "To Do",
    tasks: [
      {
        title: "UI changes",
        description:
          "make changes on the dashboard cards and aldo make changes on profile page, make reusable components as well",
        priority: "medium",
        estimatedHours: 3,
        assignees: ["bhargav"],
        endDate: "2025-06-25",
        id: uuid(),
      },
      {
        title: "Logic changes",
        description:
          "improve logic on redux and make optimistic ui through background api fetch",
        priority: "high",
        estimatedHours: 3,
        assignees: ["manish"],
        endDate: "2025-06-25",
        id: uuid(),
      },
    ],
  },
  {
    id: uuid(),
    title: "In Progress",
    tasks: [
      {
        title: "APIs changes",
        description:
          "we need change profile api, add profile pic on that",
        priority: "medium",
        estimatedHours: 4,
        assignees: ["sachin"],
        endDate: "2025-06-23",
        id: uuid(),
      },
    ],
  },
  {
    id: uuid(),
    title: "Done",
    tasks: [],
  },
];

(globalThis as any).board = globalBoard;

const board: Column[] = globalBoard;


export const getBoard = (): Column[] => board;

export const addColumn = (title: string): Column => {
  const newCol: Column = {
    id: uuid(),
    title,
    tasks: [],
  };
  board.push(newCol);
  return newCol;
};

export const updateColumn = (id: string, title: string): Column | null => {
  const col = board.find((col) => col.id === id);
  if (!col) return null;
  col.title = title;
  return col;
};

export const deleteColumn = (id: string): boolean => {
  const index = board.findIndex((col) => col.id === id);
  if (index === -1) return false;
  board.splice(index, 1);
  return true;
};

export const addTask = (columnId: string, task: Omit<Task, "id">): Task | null => {
  const col = board.find((col) => col.id === columnId);
  if (!col) return null;
  const newTask = { ...task, id: uuid() };
  col.tasks.push(newTask);
  return newTask;
};

export const updateTask = (columnId: string, taskId: string, updatedTask: Partial<Task>): Task | null => {
  const col = board.find((col) => col.id === columnId);
  if (!col) return null;
  const task = col.tasks.find((t) => t.id === taskId);
  if (!task) return null;
  Object.assign(task, updatedTask);
  return task;
};

export const deleteTask = (columnId: string, taskId: string): boolean => {
  const col = board.find((col) => col.id === columnId);
  if (!col) return false;
  const index = col.tasks.findIndex((t) => t.id === taskId);
  if (index === -1) return false;
  col.tasks.splice(index, 1);
  return true;
};

export const moveTask = (fromColumnId: string, toColumnId: string, taskId: string, newIndex: number): boolean => {
  if (fromColumnId === toColumnId) {
    console.log("Same column — skipping move");
    return false;
  }


  const fromCol = board.find((col) => col.id === fromColumnId)
  const toCol = board.find((col) => col.id === toColumnId)

  if (!fromCol || !toCol) {
    console.log("One of the columns not found", { fromCol, toCol });
    return false;
  }

  const taskIndex = fromCol.tasks.findIndex((task) => task.id === taskId)
  console.log('taskIndex', taskIndex)
  if (taskIndex === -1) {
    console.log("Task not found in source column");
    return false;
  }

  const [task] = fromCol.tasks.splice(taskIndex, 1); 
  const index = Math.max(0, Math.min(newIndex, toCol.tasks.length))
  toCol.tasks.splice(index, 0, task)

  console.log("Task moved successfully");

  return true;
}