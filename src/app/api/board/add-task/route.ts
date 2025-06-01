import { Task } from "@/types/task";
import { NextRequest, NextResponse } from "next/server";
import { addTask } from "../../data/store";

export async function POST(req: NextRequest) {
  const { columnId, task } = await req.json();
  if (!columnId || !task?.title) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const added = addTask(columnId, task as Omit<Task, "id">);
  if (!added) return NextResponse.json({ error: "Column not found" }, { status: 404 });

  return NextResponse.json(added);
}
