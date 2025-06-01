import { Task } from "@/types/task";
import { v4 as uuid } from "uuid";

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

// const board: Column[] = [
//   {
//     id: uuid(),
//     title: "To Do",
//     tasks: [],
//   },
//   {
//     id: uuid(),
//     title: "In Progress",
//     tasks: [],
//   },
//   {
//     id: uuid(),
//     title: "Done",
//     tasks: [],
//   },
// ];


const globalBoard = (globalThis as any).board || [
  {
    id: uuid(),
    title: "To Do",
    tasks: [],
  },
  {
    id: uuid(),
    title: "In Progress",
    tasks: [],
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
