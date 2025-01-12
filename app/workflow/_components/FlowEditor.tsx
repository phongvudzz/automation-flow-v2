"use client";
import { Workflow } from "@prisma/client";
import "@xyflow/react/dist/style.css";
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  FitViewOptions,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import { TaskType } from "@/types/task";
import { NodeType } from "@/types/node";
import { AppNode } from "@/types/appNodes";

import NodeComponent from "./nodes/NodeComponent";
import { useCallback } from "react";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";

type FlowEditorProps = {
  workflow: Workflow;
};

const initialNodes: AppNode[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    type: NodeType.NODE,
    data: {
      label: "1",
      type: TaskType.LAUNCH_BROWSER,
      inputs: {
        url: "https://www.google.com",
      },
    },
  },
  {
    id: "2",
    position: { x: 100, y: 200 },
    type: NodeType.NODE,
    data: {
      label: "2",
      type: TaskType.LAUNCH_BROWSER,
      inputs: {
        url: "https://www.google.com",
      },
    },
  },
];

const nodeTypes = {
  [NodeType.NODE]: NodeComponent,
};

const snapGrid: [number, number] = [50, 50];

const fitViewOptions: FitViewOptions = {
  padding: 1,
};

function FlowEditor({ workflow }: FlowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const {screenToFlowPosition ,setViewport, updateNodeData} = useReactFlow()

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    if(!e.dataTransfer) return
    e.dataTransfer.dropEffect = "move";
  }, []);


  const onDrop = useCallback((e: DragEvent) => {
    const taskType = e.dataTransfer?.getData("application/reactflow") as TaskType
    if (!taskType  || typeof taskType === "undefined") return;

    const postion = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    })

    const newNode = CreateFlowNode(taskType, { x: postion.x, y: postion.y })

    setNodes((nds) => nds.concat(newNode))
  }, []);

  return (
    <main className="h-full w-full">
      <ReactFlow
        fitView
        snapToGrid
        nodes={nodes}
        edges={edges}
        snapGrid={snapGrid}
        nodeTypes={nodeTypes}
        // @ts-ignore
        onDragOver={onDragOver}
        // @ts-ignore
        onDrop={onDrop}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitViewOptions={fitViewOptions}
      >
        <Controls position="top-left" />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
