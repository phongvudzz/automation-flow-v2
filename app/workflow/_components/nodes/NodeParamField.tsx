import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";


import { AppNode } from "@/types/appNodes";
import { TaskParam, TaskParamType } from "@/types/task";

// Params
import { StringParam } from "./param/StringParam";
import { BrowserInstanceParam } from "./param/BrowserInstanceParam";

type NodeParamFieldProps = {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
};

const NodeParamField = ({ param, nodeId, disabled }: NodeParamFieldProps) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;

  const value = node?.data?.inputs?.[param.name] ?? "";

  const updateNodeParamValue = useCallback(
    (value: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...(node.data.inputs || {}),
          [param.name]: value,
        },
      });
    },
    [updateNodeData, nodeId, node.data.inputs, param.name]
  );

  switch (param.type) {
    case TaskParamType.STRING: {
      return (
        <StringParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    }
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default: {
      return (
        <div className="h-full">
          <p className="text-xs text-muted-foreground">Not implemented!</p>
        </div>
      );
    }
  }
};

export { NodeParamField };
