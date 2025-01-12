import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon,  LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  label: "Get html from page",
  type: TaskType.PAGE_TO_HTML,
  icon: (props: LucideProps) => (
    <CodeIcon {...props} className="stroke-primary" />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Html",
      type : TaskParamType.STRING
    },
    {name :"Web page", type: TaskParamType.BROWSER_INSTANCE}
  ],
} satisfies WorkflowTask;
