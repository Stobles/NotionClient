import { cn } from "@/shared/libs/shadcn-ui";
import { LucideIcon } from "lucide-react";

export const ListItem = ({
  Icon,
  title,
  className,
  onClick,
}: {
  Icon: LucideIcon;
  title: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      role="link"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 cursor-pointer text-primary-second text-sm font-medium py-1 px-3 w-full rounded hover:bg-accent transition-colors",
        className,
      )}
    >
      <div>
        <Icon size={15} />
      </div>
      <div className="truncate">{title}</div>
    </div>
  );
};
