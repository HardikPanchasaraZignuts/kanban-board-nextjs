// src/app/api/board/delete-task/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteTask } from "../../data/store";

export async function DELETE(req: NextRequest) {
  const { columnId, taskId } = await req.json();
 if (!columnId || !taskId)
    return NextResponse.json({ error: "columnId and taskId are required" }, { status: 400 });

  const success = deleteTask(columnId, taskId);
  if (!success) return NextResponse.json({ error: "Task not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
