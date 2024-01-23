"use client";

import { useScrollTop } from "@/shared/hooks/useScrollTop";
import { cn } from "@/shared/libs/shadcn-ui";
import Logo from "@/shared/UI/Logo";
import { Button } from "@/shared/UI/Button";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/route";
import { useSessionQuery } from "@/entities/session/api/sessionApi";

export const Navbar = () => {
  const isScrolled = useScrollTop();

  const { data: session } = useSessionQuery();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full px-4 py-2 transition",
        isScrolled && "border-b shadow-sm"
      )}
    >
      <Logo className="flex" />
      {session ? (
        <div className="ml-auto justify-end w-full flex items-center gap-x-2">
          Авторизован
        </div>
      ) : null}
      {!session ? (
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
          <Button asChild className="text-xs" variant="ghost">
            <Link href={ROUTES.LOGIN}>Log in</Link>
          </Button>
          <Button asChild className="text-xs" variant="default">
            <Link href={ROUTES.REGISTER}>Get notion</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
};
