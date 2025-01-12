"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
import { CoinsIcon } from "lucide-react";
import React from "react";

function TaskMenu() {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["interactions"]}
      >
        <AccordionItem value="interactions">
          <AccordionTrigger className="font-bold">
            User interactions
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.LAUNCH_BROWSER} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="interactions">
          <AccordionTrigger className="font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export default TaskMenu;

function TaskMenuButton({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("application/reactflow", taskType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      draggable
      variant="secondary"
      onDragStart={onDragStart}
      className="flex justify-between items-center gap-2 border w-full"
    >
      <div className="flex gap-2 items-center">
        <task.icon size={20} />
        {task.label}
      </div>
      <Badge className="flex items-center gap-2" variant="outline">
        <CoinsIcon size={16} />
        {task.credits}
      </Badge>
    </Button>
  );
}
