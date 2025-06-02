"use client";

import Navbar from "@/components/Navbar";
import { useGetBoardQuery } from "@/lib/features/board/boardApi";
import ColumnComponent from "@/components/ColumnComponent";
import { Skeleton } from "@mui/material";

export default function Home() {
  const { data: board = [], isLoading } = useGetBoardQuery();
  return (
    <main>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] p-4 bg-slate-50">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={400}
                  width={300}
                />
              ))
            : board.map((col) => <ColumnComponent key={col.id} col={col} />)}
        </div>
      </div>
    </main>
  );
}
