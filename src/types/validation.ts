import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high"]),
  estimatedHours: z
    .number({ invalid_type_error: "Estimated Hours must be a number" })
    .min(1, "Estimated Hours must be at least 1"),
  assignees: z
    .union([z.string(), z.array(z.string())])
    .refine(
      (val) =>
        typeof val === "string" ? val.trim().length > 0 : val.length > 0,
      {
        message: "Assignees are required",
      }
    ),
  endDate: z.string().min(1, "End Date is required"),
});

export type TaskFormData = z.infer<typeof taskSchema>;
