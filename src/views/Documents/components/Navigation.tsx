"use client";

import { useRef, ElementRef } from "react";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { cn } from "@/shared/libs/shadcn-ui";
import { useResponsiveSidebar } from "../hooks/useResponsiveSidebar";
import { Profile } from "@/widgets/Profile/Profile";

const NavigationItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-2 w-full rounded hover:bg-accent transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const Navigation = () => {
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const {
    isMobile,
    isCollapsed,
    isResetting,
    handleMouseDown,
    collapse,
    resetWidth,
  } = useResponsiveSidebar(isResizingRef, sidebarRef, navbarRef);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 p-1 flex-col z-[50]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0",
        )}
      >
        <NavigationItem className="">
          <div className="px-2">
            <Profile isFull />
          </div>
          <div className="mr-3">
            <div
              role="button"
              onClick={collapse}
              className={cn(
                "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100 transition",
                isMobile && "opacity-100",
              )}
            >
              <ChevronsLeft className="h-6 w-6" />
            </div>
          </div>
        </NavigationItem>

        <div className="mt-4">
          <p>Documents</p>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 hover:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0 z-1"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-270px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full",
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full ">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};
