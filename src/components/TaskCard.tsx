"use client";

import { Task } from "@/types/task";
import { Avatar, AvatarGroup, Card, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type TaskCardProps = {
  task: Task;
  onClick?: () => void;
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

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="p-5 rounded-2xl cursor-pointer transition-shadow hover:shadow-md flex flex-col gap-3 border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <Typography className="font-semibold text-slate-800 text-lg">
          {task.title}
        </Typography>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${getPriorityColor(
            task.priority
          )}`}
        >
          {capitalize(task.priority)}
        </span>
      </div>

      <Typography
        variant="body2"
        className="text-slate-600 line-clamp-2 text-sm"
      >
        {task.description}
      </Typography>

      <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
        <div className="flex items-center gap-1">
          <AccessTimeIcon sx={{ fontSize: 16 }} />
          <span>{task.estimatedHours} hr</span>
        </div>
        <AvatarGroup
          max={4}
          sx={{ "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 12 } }}
        >
          {task.assignees.map((name, idx) => (
            <Avatar key={idx}>{name.trim().charAt(0).toUpperCase()}</Avatar>
          ))}
        </AvatarGroup>
      </div>
    </Card>
  );
};

export default TaskCard;
