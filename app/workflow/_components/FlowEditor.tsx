"use client";
import { Workflow } from "@prisma/client";
import "@xyflow/react/dist/style.css";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";

type FlowEditorProps = {
  workflow: Workflow;
};
function FlowEditor({ workflow }: FlowEditorProps) {
  return (
    <main className="h-full w-full">
      <ReactFlow nodes={[]} edges={[]}>
        <MiniMap />
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
