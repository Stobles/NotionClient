import { cn } from "../libs/shadcn-ui";
import { Loader } from "./Loader";

export const PageLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex items-center justify-center fixed top-0 left-0 w-full h-full bg-white z-50", className)}
    >
      <Loader className="text-gray-400 w-8 h-8" />
    </div>
  );
};
