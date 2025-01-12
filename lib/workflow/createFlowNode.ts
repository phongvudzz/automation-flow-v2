import { AppNode } from "@/types/appNodes";
import { NodeType } from "@/types/node";
import { TaskType } from "@/types/task";

export function CreateFlowNode(taskType: TaskType, position?: { x: number; y: number }): AppNode {
    return {
        id: crypto.randomUUID(),
        type: NodeType.NODE,
        position: position ?? { x: 0, y: 0 },
        dragHandle: ".drag-handle",
        data:{
            type: taskType,
            inputs: {},
        }
    }
}