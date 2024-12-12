"use server";

import prisma from "@/lib/prisma";
import { CreateWorkflowSchema } from "@/schema/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: CreateWorkflowSchema) {
  const { success, data } = CreateWorkflowSchema.safeParse(form);

  if (!success) throw new Error("Invalid form data");

  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const workflow = await prisma.workflow.create({
    data: {
      userId,
      status: "DRAFT",
      definition: "{}",
      ...data,
    },
  });

  if (!workflow) throw new Error("Failed to create workflow");

  redirect(`/workflow/editor/${workflow.id}`);
}
