import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNodeData } from "@/types/appNodes";
import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { NodeCard } from "./NodeCard";
import { NodeHeader } from "./NodeHeader";
import { NodeInput, NodeInputs } from "./NodeInputs";
import { NodeOutput, NodeOutputs } from "./NodeOutputs";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const nodeId = props.id;
  const isSelected = !!props.selected;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={nodeId} isSelected={isSelected}>
      <NodeHeader taskType={nodeData.type} nodeId={nodeId} isDragging={!!props.dragging} />
      <NodeInputs>
          {task.inputs.map((input ) => <NodeInput input={input} nodeId={nodeId} key={input.name} />)}
      </NodeInputs>
      <NodeOutputs>
          {task.outputs.map((output ) => <NodeOutput output={output} key={output.name} />)}
      </NodeOutputs>
    </NodeCard>
  );
});

NodeComponent.displayName = "NodeComponent";

export default NodeComponent;
