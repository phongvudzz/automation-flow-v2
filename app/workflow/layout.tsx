import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ToggleTheme";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

function WorkflowLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ThemeToggle />
      </footer>
    </div>
  );
}

export default WorkflowLayout;
