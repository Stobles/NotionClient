"use client";

import Image from "next/image";
import { Button } from "@/shared/UI/Button";
import { ArrowRight } from "lucide-react";

const Heroes = () => {
  return (
    <div className="col-span-12">
      <section className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
            Write, plan, share. <br /> With AI at your side.
          </h1>
          <h3 className="text-base sm:text-xl md:text-2xl font-medium">
            Notion is the connected workspace where better, faster work happens.
          </h3>
          <Button>
            Get Notion free
            <ArrowRight className="h-4 w-4 ml-2" />
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
      </section>
    </div>
  );
};

export default Heroes;
