import { NextRequest, NextResponse } from "next/server";
import { addColumn } from "../../data/store";

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const newColumn = addColumn(title);
  return NextResponse.json(newColumn);
}
