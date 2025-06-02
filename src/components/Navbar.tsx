"use client";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ColumnModal from "./ColumnModal";
import { useAddColumnMutation } from "@/lib/features/board/boardApi";


const Navbar = () => {
  const [columnModal, setColumnModal] = useState(false)
  const [addColumn] = useAddColumnMutation();

  return (
    <>
      <AppBar position="static" className="bg-indigo-500 shadow-md">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="text-white font-semibold"
          >
            Kanban Board
          </Typography>
          <IconButton
            className="text-white hover:text-indigo-200 "
            onClick={() => setColumnModal(true)}
          >
            <AddIcon className="text-white" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ColumnModal
        open={columnModal}
        onClose={() => setColumnModal(false)}
        onSubmit={async (title) => {
          await addColumn({title})
        }}
      />
    </>
  );
};

export default Navbar;
