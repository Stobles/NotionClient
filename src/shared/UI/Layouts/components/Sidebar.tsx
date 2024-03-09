"use client";

import { useRef, ElementRef } from "react";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { cn } from "@/shared/libs/shadcn-ui";
import { useResponsiveSidebar } from "../../../hooks/useResponsiveSidebar";
import { Profile } from "@/widgets/Profile/Profile";
import { DocumentsList } from "@/widgets/DocumentsList";
import { Search } from "@/entities/document/UI/Search";
import { Trash } from "@/widgets/Trash";
import { Navbar } from "./Navbar";

export const Sidebar = () => {
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
        <div className="w-full">
          <div className="flex items-center w-full gap-1 cursor-pointer text-sm font-medium py-2 px-3 w-full rounded hover:bg-accent transition-colors">
            <div
              onMouseDown={handleMouseDown}
              onClick={resetWidth}
              className="opacity-0 hover:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0 z-1"
            />
            <div className="flex-1">
              <Profile isFull />
            </div>
            <div className="w-6 h-6">
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
          </div>

          <div className="flex flex-col mt-2">
            <Search />
          </div>

          <div className="my-4">
            <DocumentsList />
          </div>

          <div className="flex flex-col">
            <Trash />
          </div>
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99] left-60 w-[calc(100%-270px)] h-12 bg-white",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full",
        )}
      >
        <Navbar isCollapsed={isCollapsed} resetWidth={resetWidth} />
      </div>
    </>
  );
};
