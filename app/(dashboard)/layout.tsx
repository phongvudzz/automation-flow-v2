import { SignedIn, UserButton } from "@clerk/nextjs";

import DesktopSidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ToggleTheme";
import BreadscrumbHeader from "@/components/BreadscrumbHeader";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadscrumbHeader />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 px-6 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
