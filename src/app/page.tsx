"use client";

import Navbar from "@/components/Navbar";
import { useGetBoardQuery, useMoveTaskMutation } from "@/lib/features/board/boardApi";
import ColumnComponent from "@/components/ColumnComponent";
import { Skeleton } from "@mui/material";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

export default function Home() {
  const { data: board = [], isLoading } = useGetBoardQuery();

  const sensors = useSensors(useSensor(PointerSensor));
  const [moveTask] = useMoveTaskMutation();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;

    const [taskId, fromColumnId] = String(active.id).split("::");
    const toColumnId = String(over.id);

    if (!taskId || !fromColumnId || !toColumnId || fromColumnId === toColumnId)
      return;

    const newIndex = 0; 
    moveTask({ fromColumnId, toColumnId, taskId, newIndex });
  }
  return (
    <main>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] p-4 bg-slate-50 flex flex-col">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
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
        </DndContext>
      </div>
    </main>
  );
}
