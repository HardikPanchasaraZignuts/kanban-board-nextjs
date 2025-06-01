import { NextRequest, NextResponse } from "next/server";
import { updateTask } from "../../data/store";

export async function PUT(req: NextRequest) {
  const { columnId, taskId, updatedTask } = await req.json();

  if (!columnId || !taskId || !updatedTask)
    return NextResponse.json({ error: "columnId, taskId, and updatedTask are required" }, { status: 400 });

  const updated = updateTask(columnId, taskId, updatedTask);
  if (!updated) return NextResponse.json({ error: "Task not found" }, { status: 404 });

  return NextResponse.json(updated);
}
