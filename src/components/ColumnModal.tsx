"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormTextField from "./FormTextField"; // same component used in TaskModal

const columnSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type ColumnFormData = z.infer<typeof columnSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (title: string) => void;
  defaultTitle?: string;
};

export default function ColumnModal({
  open,
  onClose,
  onSubmit,
  defaultTitle = "",
}: Props) {
  const { control, handleSubmit, reset } = useForm<ColumnFormData>({
    resolver: zodResolver(columnSchema),
    defaultValues: {
      title: defaultTitle,
    },
  });

  useEffect(() => {
    reset({ title: defaultTitle });
  }, [defaultTitle, reset]);

  const onFormSubmit = (data: ColumnFormData) => {
    if (onSubmit) {
      onSubmit(data.title.trim());
    }
    reset(); // Clear form after submit
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle>{defaultTitle ? "Edit Column" : "Add Column"}</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <FormTextField
            name="title"
            label="Column Title"
            control={control}
            autoFocus
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            onClose();
            reset();
          }}>Cancel</Button>
          <Button type="submit" variant="contained">
            {defaultTitle ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
