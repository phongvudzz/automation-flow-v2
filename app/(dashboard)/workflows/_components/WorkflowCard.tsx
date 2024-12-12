"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Workflow, WorkflowStatus } from "@prisma/client";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";

type WorkflowCardProps = {
  workflow: Workflow;
};

const statusColorMap: Record<WorkflowStatus, string> = {
  [WorkflowStatus.DRAFT]: "bg-orange-600 text-white",
  [WorkflowStatus.PUBLISHED]: "bg-primary text-white",
  [WorkflowStatus.ACTIVE]: "bg-success text-white",
};

function WorkflowCard({ workflow }: WorkflowCardProps) {
  const isDraft = workflow.status === "DRAFT";

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30 group/card">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "size-10 rounded-full flex items-center justify-center",
              statusColorMap[workflow.status]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5 text-primary" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <TooltipWrapper content={workflow.description}>
                <Link
                  className="flex items-center hover:underline"
                  href={`/workflow/editor/${workflow.id}`}
                >
                  {workflow.name}
                </Link>
              </TooltipWrapper>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                  Draft
                </span>
              )}
              {/* <DuplicateWorkflowDialog workflowId={workflow.id} /> */}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* {!isDraft && <RunButton workflowId={workflow.id} />} */}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions
            workflowId={workflow.id}
            workflowName={workflow.name}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function WorkflowActions({
  workflowId,
  workflowName,
}: {
  workflowId: string;
  workflowName: string;
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <DeleteWorkflowDialog
        open={openDeleteModal}
        workflowId={workflowId}
        workflowName={workflowName}
        setOpen={setOpenDeleteModal}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <TooltipWrapper content="More actions">
              <div className="flex items-center justify-center size-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onClick={() => setOpenDeleteModal((open) => !open)}
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default WorkflowCard;
