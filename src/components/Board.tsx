"use client";

import { IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskCard from "./TaskCard";
import { useState } from "react";
import ColumnModal from "./ColumnModal";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskModal from "./TaskModal";


const mockColumn = [
  { id: "todo", title: "TO DO" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];


const Board = () => {
    const [columnModal, setColumnModal] = useState(false)
    const [taskModal, setTaskModal] = useState(false)
    const [initialData, setInitialData] = useState({});
  const [columnValue, setColumnValue] = useState('')
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTaskSubmit = () => {

  }
  
  return (
    <div className="min-h-[calc(100vh-64px)] p-4 bg-slate-50">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {mockColumn.map((col) => (
          <div className="min-w-[300px] w-[300px]" key={col.id}>
            <Paper
              elevation={3}
              className="p-4 rounded-xl bg-white shadow-md space-y-4"
            >
              <div className="flex justify-between items-center">
                <Typography variant="h6" className="text-slate-700 font-medium">
                  {col.title}
                </Typography>
                <div className="flex gap-1">
                  <IconButton
                    color="primary"
                    onClick={() => setTaskModal(true)}
                  >
                    <AddIcon />
                  </IconButton>

                  <IconButton color="primary" onClick={handleMenuOpen}>
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
                        setColumnValue(col.title);
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
                        handleMenuClose();
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
                <TaskCard
                  task={{
                    id: "1",
                    title: "title",
                    description:
                      "description description  description description description description description description description description description description description description",
                    priority: "low",
                    status: "done",
                    estimatedHours: 20,
                    assignees: ["hardik", "manish"],
                    endDate: "2025-08-20",
                  }}
                  onClick={() => {
                    setTaskModal(true);
                    setInitialData({
                      id: "1",
                      title: "title",
                      description:
                        "description description  description description description description description description description description description description description description",
                      priority: "low",
                      status: "done",
                      estimatedHours: 20,
                      assignees: ["hardik", "manish"],
                      endDate: "2025-08-20",
                    });
                  }}
                />
              </div>
            </Paper>
            <TaskModal
              open={taskModal}
              onClose={() => setTaskModal(false)}
              onSubmit={handleTaskSubmit}
              columnId={col.id}
              initialData={initialData}
            />
          </div>
        ))}
      </div>
      <ColumnModal
        open={columnModal}
        onClose={() => setColumnModal(false)}
        defaultTitle={columnValue}
      />
    </div>
  );
};

export default Board;
