import { cn } from "@/shared/libs/shadcn-ui";

export const SidebarItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 cursor-pointer text-sm font-medium py-1 px-3 w-full rounded hover:bg-accent transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
};
