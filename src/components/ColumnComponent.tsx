"use client";

import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskCard from "./TaskCard";
import { useState } from "react";
import ColumnModal from "./ColumnModal";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskModal from "./TaskModal";
import {
  useAddTaskMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} from "@/lib/features/board/boardApi";
import { Column } from "@/app/api/data/store";
import { Task } from "@/types/task";
import ConfirmModal from "./ConfirmModal";

interface ColumnProps {
  col: Column;
}

const ColumnComponent = ({ col }: ColumnProps) => {
  const [columnModal, setColumnModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [selectedColumn, setSelectedColumn] = useState<null | Column>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [updateColumn] = useUpdateColumnMutation();
  const [deleteColumn] = useDeleteColumnMutation();
  const [addTask] = useAddTaskMutation();

  const open = Boolean(anchorEl);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    col: Column
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedColumn(col);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTaskSubmit = (task: Omit<Task, "id">) => {
    if (!selectedColumn) return;
    addTask({ columnId: selectedColumn.id, task });
  };

  const handleDelete = () => {
    deleteColumn({ id: selectedColumn?.id ?? "" });
    handleMenuClose();
    setConfirmDeleteModal(false);
  };

  return (
    <div className="min-w-[300px] w-[300px]">
      <Paper
        elevation={3}
        className="p-4 rounded-xl bg-white shadow-md space-y-4"
      >
        <div className="flex justify-between items-center">
          <Typography variant="h6" className="text-slate-700 font-medium">
            {col.title.length > 10 ? col.title.slice(0, 10) +  '...' : col.title}
          </Typography>
          <div className="flex gap-1">
            <Button
              disableRipple
              disableFocusRipple
              sx={{ textTransform: "none" }}
              onClick={() => {
                setSelectedColumn(col);
                setInitialData({});
                setTaskModal(true);
              }}
            >
              <AddIcon />
              <span>Add Task</span>
            </Button>

            <IconButton color="primary" onClick={(e) => handleMenuOpen(e, col)}>
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() => {
                  setColumnModal(true);
                  handleMenuClose();
                }}
              >
                <EditIcon fontSize="small" className="mr-2 text-indigo-500" />
                <span className="text-indigo-500">Edit</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setConfirmDeleteModal(true);
                }}
              >
                <DeleteIcon fontSize="small" className="mr-2 text-red-500" />
                <span className="text-red-500">Delete</span>
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="space-y-2">
          {col.tasks.map((task) => (
            <TaskCard key={task.id} task={task} columnId={col.id} />
          ))}
        </div>
      </Paper>

      <ColumnModal
        open={columnModal}
        onClose={() => setColumnModal(false)}
        defaultTitle={selectedColumn?.title}
        onSubmit={async (title) => {
          await updateColumn({ id: selectedColumn?.id ?? "", title });
        }}
      />
      <TaskModal
        open={taskModal}
        onClose={() => setTaskModal(false)}
        onSubmit={handleTaskSubmit}
        columnId={selectedColumn?.id ?? ""}
        initialData={initialData}
      />

      <ConfirmModal
        open={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Column"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ColumnComponent;
