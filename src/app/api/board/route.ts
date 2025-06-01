// src/app/api/board/route.ts
import { NextResponse } from "next/server";
import { getBoard } from "../data/store";

export async function GET() {
  const board = getBoard();
  console.log('board', board)
  return NextResponse.json(board);
}
