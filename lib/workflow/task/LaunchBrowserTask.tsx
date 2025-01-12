import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  label: "Launch Browser",
  type: TaskType.LAUNCH_BROWSER,
  icon: (props: LucideProps) => (
    <GlobeIcon {...props} className="stroke-primary" />
  ),
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamType.STRING,
      required: true,
      hideHandle: true,
      helperText: "eg: https://www.google.com",
    },
  ],
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
} satisfies WorkflowTask;
