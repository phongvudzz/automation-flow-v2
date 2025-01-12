import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { ColorForHandle } from "./common";
import { NodeParamField } from "./NodeParamField";

type NodeInputsProps = {
  children: React.ReactNode;
};

const NodeInputs = ({ children }: NodeInputsProps) => {
  return <div className="flex flex-col gap-2 divide-y">{children}</div>;
};

type NodeInputProps = {
  input: TaskParam;
  nodeId: string;
};

const NodeInput = ({ input, nodeId }: NodeInputProps) => {
  return (
    <div className={cn("flex justify-start relative p-3 bg-secondary w-full")}>
      <NodeParamField param={input} nodeId={nodeId} disabled={false} />
      {!input.hideHandle && (
        <Handle
          type="target"
          position={Position.Left}
          id={input.name}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !size-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};

export { NodeInputs, NodeInput };
