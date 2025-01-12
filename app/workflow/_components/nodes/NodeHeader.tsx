import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNode } from "@/types/appNodes";
import { TaskType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

type NodeHeaderProps = {
  taskType: TaskType;
  nodeId: string;
  isDragging: boolean;
};

const NodeHeader = ({ taskType, nodeId, isDragging }: NodeHeaderProps) => {
  const task = TaskRegistry[taskType];

  const { deleteElements, getNode, addNodes } = useReactFlow();

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase">{task.label}</p>

        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16} />
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => {
                  toast.success("Node deleted successfully");
                  deleteElements({ nodes: [{ id: nodeId }] });
                }}
              >
                <TrashIcon size={12} />
              </Button>
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;
                  if (
                    !node ||
                    !node.data ||
                    !node.data.type ||
                    !node.measured
                  ) {
                    return;
                  }

                  const newX = node.position.x;
                  const newY =
                    node.position.y! + (node?.measured?.height || 0)! + 20;

                  const newNode = CreateFlowNode(node.data.type, {
                    x: newX,
                    y: newY,
                  });

                  toast.success("Node added successfully");
                  addNodes(newNode);
                }}
              >
                <CopyIcon size={12} />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size={"icon"}
            className={cn(
              "drag-handle cursor-grab",
              isDragging && "border-primary border-2"
            )}
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { NodeHeader };
