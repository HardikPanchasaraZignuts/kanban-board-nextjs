"use client";

import { Task } from "@/types/task";
import { Avatar, AvatarGroup, Box, Card, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/lib/features/board/boardApi";
import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  task: Task;
  columnId: string;
};

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "low":
      return "bg-green-100 text-green-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "high":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const TaskCard = ({ task, columnId }: TaskCardProps) => {
  const [taskModal, setTaskModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${task.id}::${columnId}`,
  })
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation()

  const handleTaskSubmit = (taskData: Omit<Task, "id">) => {
    if (!columnId || !task.id) return;
    updateTask({ columnId: columnId, taskId: task.id, task: taskData });
  };

  const handleDelete = () => {
    deleteTask({ columnId: columnId, taskId: task.id });
    setConfirmDeleteModal(false);
  };

  return (
    <>
      <div ref={setNodeRef} {...listeners} {...attributes} style={style}  >
        <Card className="p-5 rounded-2xl cursor-pointer transition-shadow hover:shadow-md flex flex-col gap-3 border border-gray-100">
          <div className="flex justify-between items-start">
            <Typography className="font-semibold text-slate-800 text-lg">
              {task.title}
            </Typography>
            <Box>
              <EditIcon
                fontSize="small"
                className="mr-2 text-indigo-500"
                onClick={() => {
                  setTaskModal(true);
                }}
              />
              <DeleteIcon
                fontSize="small"
                className="text-red-500"
                onClick={() => {
                  setConfirmDeleteModal(true)
                }}
              />
            </Box>
          </div>

          <Typography
            variant="body2"
            className="text-slate-600 line-clamp-2 text-sm"
          >
            {task.description}
          </Typography>

          <span
            className={`text-xs text-center font-medium px-3 py-1 rounded-full ${getPriorityColor(
              task.priority
            )}`}
          >
            {capitalize(task.priority)}
          </span>

          <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
            <div className="flex items-center gap-1">
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              <span>{task.estimatedHours} hr</span>
            </div>
            <AvatarGroup
              max={4}
              sx={{
                "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 12 },
              }}
            >
              {task.assignees.map((name, idx) => (
                <Avatar key={idx}>{name.trim().charAt(0).toUpperCase()}</Avatar>
              ))}
            </AvatarGroup>
          </div>
        </Card>
      </div>

      <TaskModal
        open={taskModal}
        onClose={() => setTaskModal(false)}
        onSubmit={handleTaskSubmit}
        columnId={columnId}
        initialData={task}
      />
      <ConfirmModal
        open={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default TaskCard;
