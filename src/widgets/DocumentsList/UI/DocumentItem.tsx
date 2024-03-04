import { useCreateDocument } from "@/features/documents/create";
import { useUpdateDocument } from "@/features/documents/update";
import { Button } from "@/shared/UI/Button";
import { EmojiPopover } from "@/shared/UI/EmojiPopover";
import { Skeleton } from "@/shared/UI/Skeleton";
import { EmojiClickData } from "emoji-picker-react";

import { ChevronRight, PlusIcon } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { DocumentMenu } from "./DocumentMenu";
import { Documents } from "./Documents";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DocumentItem = ({
  id,
  title,
  icon,
  level = 0,
  isFavorited,
}: {
  id: string;
  title: string;
  icon: string;
  level?: number;
  isFavorited: boolean;
}) => {
  const { create } = useCreateDocument();
  const { update } = useUpdateDocument({ id });
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(false);

  const onExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onEmojiClick = (data: EmojiClickData, e: MouseEvent) => {
    update({ icon: data.imageUrl });
  };

  const documentLink = `${process.env.CLIENT_BASE_URL}/documents/${id}`;
  const isActive = pathname === `/documents/${id}`;

  return (
    <div className="flex flex-col">
      <li
        style={{ paddingLeft: `${level * 15}px` }}
        className={`group flex items-center cursor-pointer text-primary-second text-[13px] font-medium py-1 pr-3 w-full rounded hover:bg-accent transition-colors ${
          isActive && "bg-accent"
        }`}
      >
        <div className="w-full flex gap-0.5 flex-1 pl-2">
          <Button onClick={onExpand} size="icon" variant="ghost">
            <ChevronRight
              className={
                isExpanded
                  ? "transition-transform rotate-90"
                  : "transition-transform"
              }
              size={16}
            />
          </Button>
          <EmojiPopover onEmojiClick={onEmojiClick} icon={icon} />
          <Link href={documentLink} className="w-full ml-1 truncate">
            {title}
          </Link>
        </div>
        <div className="flex justify-end text-primary gap-1 opacity-0 group-hover:opacity-100">
          <DocumentMenu
            documentId={id}
            isFavorited={isFavorited}
            documentLink={documentLink}
          />
          <Button
            onClick={() => create({ title: "Untitled", parentId: id })}
            size="icon"
            variant="ghost"
          >
            <PlusIcon size={14} />
          </Button>
        </div>
      </li>
      {isExpanded && <Documents parentId={id} level={level + 1} />}
    </div>
  );
};

DocumentItem.Skeleton = function DocumentItemSkeleton({
  level,
}: {
  level?: number;
}) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12}px` : "12px" }}
      className="flex items-center gap-1 w-full text-primary-second"
    >
      <ChevronRight size={18} />
      <Skeleton className="w-5 h-5 rounded-sm" />
      <Skeleton className="w-[40%] h-2.5" />
    </div>
  );
};
