"use client";

import Link from "next/link";

import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { ROUTES } from "@/shared/constants/route";
import { useScrollTop } from "@/shared/hooks/useScrollTop";
import { cn } from "@/shared/libs/shadcn-ui";
import { Button } from "@/shared/UI/Button";
import Logo from "@/shared/UI/Logo";

export const Header = ({ profile }: { profile?: React.ReactNode }) => {
  const isScrolled = useScrollTop();

  const { data: session } = useSessionQuery();

  return (
    <header
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full px-4 py-2 transition",
        isScrolled && "border-b shadow-sm",
      )}
    >
      <Logo className="flex" />
      <div className="ml-auto md:justify-end justify-between w-fit flex items-center gap-x-2">
        {session ? (
          profile
        ) : (
          <>
            <Button asChild className="text-xs" variant="ghost">
              <Link href={ROUTES.LOGIN}>Log in</Link>
            </Button>
            <Button asChild className="text-xs" variant="default">
              <Link href={ROUTES.REGISTER}>Get notion</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
