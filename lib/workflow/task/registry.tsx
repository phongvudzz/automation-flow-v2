import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

// Tasks
import { PageToHtmlTask } from "./PageToHtmlTask";
import { LaunchBrowserTask } from "./LaunchBrowserTask";

type Registry = { [K in TaskType]: WorkflowTask & { type: TaskType } };

export const TaskRegistry: Registry = {
  PAGE_TO_HTML: PageToHtmlTask,
  LAUNCH_BROWSER: LaunchBrowserTask,
};
