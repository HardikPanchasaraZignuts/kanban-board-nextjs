"use client";

import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
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
  useGetBoardQuery,
  useUpdateColumnMutation,
} from "@/lib/features/board/boardApi";
import { Column } from "@/app/api/data/store";
import { Task } from "@/types/task";
import ConfirmModal from "./ConfirmModal";

const Board = () => {
  const { data: board = [], isLoading } = useGetBoardQuery();
  console.log("🚀 ~ Board ~ data:", board);
  const [updateColumn] = useUpdateColumnMutation();
  const [deleteColumn] = useDeleteColumnMutation();
  const [addTask] = useAddTaskMutation();

  const [columnModal, setColumnModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [initialData, setInitialData] = useState({});

  const [selectedColumn, setSelectedColumn] = useState<null | Column>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
    <div className="min-h-[calc(100vh-64px)] p-4 bg-slate-50">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {isLoading ? (
          <Skeleton variant="rectangular" height={400} width={300} />
        ) : (
          board.map((col) => (
            <div className="min-w-[300px] w-[300px]" key={col.id}>
              <Paper
                elevation={3}
                className="p-4 rounded-xl bg-white shadow-md space-y-4"
              >
                <div className="flex justify-between items-center">
                  <Typography
                    variant="h6"
                    className="text-slate-700 font-medium"
                  >
                    {col.title}
                  </Typography>
                  <div className="flex gap-1">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelectedColumn(col);
                        setInitialData({});
                        setTaskModal(true);
                      }}
                    >
                      <AddIcon />
                    </IconButton>

                    <IconButton
                      color="primary"
                      onClick={(e) => handleMenuOpen(e, col)}
                    >
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
                        <EditIcon
                          fontSize="small"
                          className="mr-2 text-indigo-500"
                        />
                        <span className="text-indigo-500">Edit</span>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setConfirmDeleteModal(true);
                        }}
                      >
                        <DeleteIcon
                          fontSize="small"
                          className="mr-2 text-red-500"
                        />
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
            </div>
          ))
        )}
      </div>
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

export default Board;
