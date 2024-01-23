import { cn } from "@/shared/libs/shadcn-ui";

export const Title = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-2xl md:text-4xl font-bold break-words", className)}>
      {children}
    </h2>
  );
};
