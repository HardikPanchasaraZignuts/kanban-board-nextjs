import { NextRequest, NextResponse } from "next/server";
import { updateColumn } from "../../data/store";

export async function PATCH(req: NextRequest) {
  const { id, title } = await req.json();
  if (!id || !title)
    return NextResponse.json(
      { error: "ID and Title required" },
      { status: 400 }
    );

  const updated = updateColumn(id, title);
  if (!updated)
    return NextResponse.json({ error: "Column not found" }, { status: 404 });

  return NextResponse.json(updated);
}
