import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/shared/libs/shadcn-ui";
import Link from "next/link";
import { ROUTES } from "../constants/route";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href={ROUTES.HOME}
      className={cn("flex items-center gap-x-2 w-fit", className)}
    >
      <Image
        src="/images/logo.png"
        height="33"
        width="33"
        alt="logo"
        className="dark:hidden"
      />
      <p className={cn("font-semibold", font.className)}>Stobletion</p>
    </Link>
  );
};

export default React.memo(Logo);
