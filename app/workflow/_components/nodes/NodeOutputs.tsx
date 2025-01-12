import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { ColorForHandle } from "./common";


type NodeOutputsProps = {
  children: React.ReactNode;
};

const NodeOutputs = ({ children }: NodeOutputsProps) => {
  return <div className="flex flex-col gap-2 divide-y">{children}</div>;
};

type NodeOutputProps = {
  output: TaskParam;
};

const NodeOutput = ({ output }: NodeOutputProps) => {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
     <p className="text-xs text-muted-foreground">{output.name}</p>
     <Handle 
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn("!bg-muted-foreground !border-2 !border-background !-right-2 !size-4",
            ColorForHandle[output.type]
        )}
     />
    </div>
  );
};  

export { NodeOutputs, NodeOutput };