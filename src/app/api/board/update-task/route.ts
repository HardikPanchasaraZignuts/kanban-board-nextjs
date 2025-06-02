import { NextRequest, NextResponse } from "next/server";
import { updateTask } from "../../data/store";

export async function PATCH(req: NextRequest) {
  const { columnId, taskId, task } = await req.json();

  if (!columnId || !taskId || !task)
    return NextResponse.json(
      { error: "columnId, taskId, and updatedTask are required" },
      { status: 400 }
    );

  const updated = updateTask(columnId, taskId, task);
  if (!updated)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  return NextResponse.json(updated);
}
