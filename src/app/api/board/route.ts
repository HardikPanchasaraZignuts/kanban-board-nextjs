// src/app/api/board/route.ts
import { NextResponse } from "next/server";
import { getBoard } from "../data/store";

export async function GET() {
  const board = getBoard();
  return NextResponse.json(board);
}
