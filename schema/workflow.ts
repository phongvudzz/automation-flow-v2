import { z } from "zod";

export const CreateWorkflowSchema = z.object({
  name: z.string(),
  description: z.string().max(80).optional(),
});

export type CreateWorkflowSchema = z.infer<typeof CreateWorkflowSchema>;
