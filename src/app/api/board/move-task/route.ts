import { NextResponse } from "next/server";
import { moveTask } from "../../data/store";

export async function PATCH(req: Request) {
  try {
    const { fromColumnId, toColumnId, taskId, newIndex } = await req.json();
    const success = moveTask(fromColumnId, toColumnId, taskId, newIndex);
    if (!success) {
      return NextResponse.json({ error: "Move failed" }, { status: 400 });
    }

    return NextResponse.json({ message: "Task moved successfully" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}