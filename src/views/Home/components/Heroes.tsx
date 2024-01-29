"use client";

import Image from "next/image";
import { Button } from "@/shared/UI/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/route";

const Heroes = () => {
  return (
    <section className="col-span-12">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
            Write, plan, share. <br /> With AI at your side.
          </h1>
          <h3 className="text-base sm:text-xl md:text-2xl font-medium">
            Notion is the connected workspace where better, faster work happens.
          </h3>
          <Button asChild>
            <Link href={ROUTES.DOCUMENTS}>
              Get Notion free <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center max-w-5xl">
          <div className="flex items-center">
            <div className="relative max-w-[640px] h-[175px] sm:h-[235px]">
              <Image
                src="/images/Home/hero/Hero.webp"
                fill
                className="!relative w-full object-bottom object-contain dark:hidden"
                alt="documents"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heroes;
