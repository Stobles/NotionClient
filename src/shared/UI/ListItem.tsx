import { cn } from "@/shared/libs/shadcn-ui";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { ComponentProps } from "react";

type ListItemProps = ComponentProps<"div"> & {
  Icon?: LucideIcon;
  emojiSrc?: string;
  title: string;
  className?: string;
  isHover?: boolean;
  updatedTime?: string;
  onClick?: () => void;
};

export const ListItem = ({
  Icon,
  emojiSrc,
  title,
  className,
  onClick,
  isHover = true,
  updatedTime,
  ...props
}: ListItemProps) => {
  return (
    <div
      {...props}
      role="link"
      onClick={onClick}
      className={cn(
        `flex items-center justify-between gap-2 cursor-pointer text-primary-second text-[13px] font-medium py-1 px-3 w-full rounded ${
          isHover ? "hover:bg-accent transition-colors" : ""
        } ${!Icon ? "pl-8" : ""}`,
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {emojiSrc && (
          <Image src={emojiSrc || ""} width={18} height={18} alt="emoji_icon" />
        )}
        {!emojiSrc && Icon && (
          <div>
            <Icon size={16} />
          </div>
        )}
        <div className="truncate">{title}</div>
      </div>
      {updatedTime && <div>{updatedTime}</div>}
    </div>
  );
};
