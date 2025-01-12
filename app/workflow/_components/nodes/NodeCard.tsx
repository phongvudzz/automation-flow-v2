import { cn } from "@/lib/utils";
import { AppNode } from "@/types/appNodes";
import { useReactFlow } from "@xyflow/react";

type NodeCardProps = {
  nodeId: string;
  isSelected: boolean;
  children: React.ReactNode;
};

const NodeCard = ({ nodeId, isSelected, children }: NodeCardProps) => {
  const { getNode, setCenter } = useReactFlow();

  const doubleClickNode = () => {
    const node = getNode(nodeId) as AppNode;

    if (!node) return;

    const { position, measured } = node;

    if (!position || !measured) return;

    const { width, height } = measured;

    if (width === undefined || height === undefined) return;

    const x = position.x + width / 2;
    const y = position.y + height / 2;

    if (x === undefined || y === undefined) return;

    setCenter(x, y, {
      zoom: 1,
      duration: 0.5,
    });
  };

  return (
    <div
    onDoubleClick={doubleClickNode}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary"
      )}
    >
      {children}
    </div>
  );
};

export { NodeCard };
