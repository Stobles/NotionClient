import {
  ElementRef,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useMediaQuery } from "usehooks-ts";

export const useResponsiveSidebar = (
  isResizingRef: MutableRefObject<boolean>,
  sidebarRef: RefObject<ElementRef<"aside">>,
  navbarRef: RefObject<ElementRef<"div">>,
) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "270px";
      sidebarRef.current.style.padding = "4px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 270px)",
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "270px");

      setTimeout(() => setIsResetting(false), 300);
    }
  }, [isMobile, navbarRef, sidebarRef]);

  const collapse = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      sidebarRef.current.style.padding = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  }, [sidebarRef, navbarRef]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile, resetWidth, collapse]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile, collapse]);

  return {
    isMobile,
    isResetting,
    isCollapsed,
    handleMouseDown,
    collapse,
    resetWidth,
  };
};
