import { useCreateDocument } from "@/features/documents/create";
import { useUpdateDocument } from "@/features/documents/update";
import { Rename } from "@/features/documents/update/UI/Rename";
import { Button } from "@/shared/UI/Button";
import { EmojiPopover } from "@/features/documents/update/UI/EmojiPopover";
import { Skeleton } from "@/shared/UI/Skeleton";
import { DocumentMenu } from "./DocumentMenu";
import { Documents } from "./Documents";

import { useState } from "react";
import { ChevronRight, PlusIcon } from "lucide-react";
import { EmojiClickData } from "emoji-picker-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const documentLink = `${process.env.CLIENT_BASE_URL}/documents/${id}`;
  const isActive = pathname === `/documents/${id}`;

  const onExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col">
      <li
        style={{ paddingLeft: `${level * 15}px` }}
        className={`group flex justify-between items-center cursor-pointer text-primary-second text-[13px] font-medium py-1 pr-3 w-full rounded hover:bg-accent transition-colors ${
          isActive && "bg-accent"
        }`}
      >
        <div className="w-full max-w-[80%] flex items-center gap-0.5 flex-1 pl-2">
          <div className="flex items-center">
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
          </div>

          {isOpen && (
            <Rename
              id={id}
              name={title}
              icon={icon}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
          <div>
            <EmojiPopover id={id} icon={icon} />
          </div>
          <Link href={`/documents/${id}`} className="w-full ml-1 truncate">
            <div className="truncate">{title}</div>
          </Link>
        </div>
        <div className="flex justify-end text-primary gap-1 md:opacity-0 md:group-hover:opacity-100">
          <DocumentMenu
            documentId={id}
            isFavorited={isFavorited}
            documentLink={documentLink}
            setIsOpen={setIsOpen}
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
