"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowForUser() {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const workflows = await prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!workflows) throw new Error("Failed to create workflow");

  return workflows;
}
