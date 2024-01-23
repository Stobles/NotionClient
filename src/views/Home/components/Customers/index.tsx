import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { logos } from "./config/consts";
import Image from "next/image";

const Customers = () => {
  return (
    <div className="col-span-12">
      <section className="w-full flex flex-col items-center mb-28 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Millions run on Notion every day
          </h2>
          <div className="flex flex-col items-center gap-2 text-sm">
            <h4>
              Powering the world’s best teams, from next-generation startups{" "}
              <br /> to established enterprises.
            </h4>
            <Link
              className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 hover:underline"
              href="/"
            >
              <div>Read customer stories</div>
              <GoArrowRight />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-7 gap-y-7 flex-wrap w-full max-w-[820px] mt-8">
          {logos.map((logo) => (
            <div
              key={logo.img}
              className="relative w-full max-w-[100px] h-[30px]"
            >
              <Image
                className="object-contain"
                fill
                src={logo.img}
                alt="logo"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Customers;
