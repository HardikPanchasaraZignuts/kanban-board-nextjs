"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Task } from "@/types/task";
import { taskSchema, TaskFormData } from "@/types/validation";
import FormTextField from "./FormTextField";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  initialData?: Partial<Task>;
  columnId: string;
};

export default function TaskModal({
  open,
  onClose,
  onSubmit,
  initialData = {},
  columnId,
}: Props) {
  const { control, handleSubmit, reset } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "low",
      estimatedHours: 1,
      assignees: "",
      endDate: new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    reset({
      title: "",
      description: "",
      priority: "low",
      estimatedHours: 1,
      assignees: "",
      endDate: new Date().toISOString().slice(0, 10),
      ...initialData,
    });
  }, [initialData, columnId, reset]);

  const onFormSubmit = (data: TaskFormData) => {
    console.log("data", data);
    const formattedAssignees =
      typeof data.assignees === "string"
        ? data.assignees.split(",").map((a) => a.trim())
        : data.assignees;

    onSubmit({
      ...data,
      assignees: formattedAssignees,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initialData?.title ? "Edit Task" : "Create Task"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent className="space-y-2">
          <FormTextField name="title" label="Title" control={control} />
          <FormTextField
            name="description"
            label="Description"
            control={control}
            multiline
            rows={3}
          />
          <FormTextField
            name="priority"
            label="Priority"
            control={control}
            select
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </FormTextField>
          <FormTextField
            name="estimatedHours"
            label="Estimated Hours"
            control={control}
            type="number"
          />
          <FormTextField
            name="assignees"
            label="Assignees (comma-separated)"
            control={control}
          />
          <FormTextField
            name="endDate"
            label="End Date"
            control={control}
            type="date"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {initialData?.title ? "Update Task" : "Add Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
