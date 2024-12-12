import React from "react";

type TopbarProps = {
  title: string;
  subtitle?: string;
  isPublished?: boolean;
  workflowId: string;
  hideButtons?: boolean;
};

function Topbar({
  title,
  subtitle,
  isPublished,
  workflowId,
  hideButtons,
}: TopbarProps) {
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      Topbar
    </header>
  );
}

export default Topbar;
