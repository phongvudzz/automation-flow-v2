import { Workflow, WorkflowStatus } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./Topbar";
import TaskMenu from "./TaskMenu";

type EditorProps = {
  workflow: Workflow;
};

function Editor({ workflow }: EditorProps) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <Topbar
          title={workflow.name}
          workflowId={workflow.id}
          subtitle={workflow.description || "No description"}
          isPublished={workflow.status === WorkflowStatus.PUBLISHED}
        />
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
