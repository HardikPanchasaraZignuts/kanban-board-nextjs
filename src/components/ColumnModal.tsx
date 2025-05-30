"use client";

import { useEffect, useState } from "react";
import {
    Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (title: string) => void;
  defaultTitle?: string;
};

const ColumnModal = ({ open, onClose, defaultTitle = "" }: Props) => {
  const [title, setTitle] = useState(defaultTitle);
  useEffect(() => {
    setTitle(defaultTitle);
  }, [defaultTitle]);
  const handleSubmit = () => {
    if (title.trim()) {
        console.log(title.trim());
        setTitle('')
        onClose();
    }
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth >
      <DialogTitle>{defaultTitle ? "Edit Column" : "Add Column"}</DialogTitle>
          <DialogContent>
              <Box marginTop={2} >
                  
        <TextField
          autoFocus
          label="Column Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
          </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {defaultTitle ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnModal;
