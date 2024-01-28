"use client";

import { useScrollTop } from "@/shared/hooks/useScrollTop";
import { cn } from "@/shared/libs/shadcn-ui";
import Logo from "@/shared/UI/Logo";
import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { Actions } from "./ui/Actions";

export const Navbar = () => {
  const isScrolled = useScrollTop();

  const { data: session } = useSessionQuery();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full px-4 py-2 transition",
        isScrolled && "border-b shadow-sm",
      )}
    >
      <Logo className="flex" />
      <Actions session={session} />
    </div>
  );
};
