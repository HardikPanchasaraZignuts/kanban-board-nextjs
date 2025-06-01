import { NextRequest, NextResponse } from "next/server";
import { deleteColumn } from "../../data/store";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Column ID required" }, { status: 400 });

  const success = deleteColumn(id);
  if (!success) return NextResponse.json({ error: "Column not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
