import { useDocumentsByParentQuery } from "@/entities/document";
import { useCreateDocument } from "@/features/documents/create";
import { useUpdateDocument } from "@/features/documents/update";
import { Button } from "@/shared/UI/Button";
import { EmojiPopover } from "@/shared/UI/EmojiPopover";
import { ListItem } from "@/shared/UI/ListItem";
import { Skeleton } from "@/shared/UI/Skeleton";
import { EmojiClickData } from "emoji-picker-react";

import { ChevronRight, PlusIcon } from "lucide-react";
import { useState } from "react";
import { DocumentMenu } from "./DocumentMenu";
import { useSessionQuery } from "@/entities/session/api/sessionApi";

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
  const { data: session } = useSessionQuery();
  const { data: documents } = useDocumentsByParentQuery({ parentId: id });
  const { create } = useCreateDocument();
  const { update } = useUpdateDocument({ id });

  const [isExpanded, setIsExpanded] = useState(false);

  const onExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onEmojiClick = (data: EmojiClickData, e: MouseEvent) => {
    update({ icon: data.imageUrl });
  };

  return (
    <div className="flex flex-col">
      <li
        style={{ paddingLeft: `${level * 15}px` }}
        className="group flex items-center cursor-pointer text-primary-second text-[13px] font-medium py-1 pl-1 pr-2 w-full rounded hover:bg-accent transition-colors"
      >
        <div className="w-full flex gap-0.5 flex-1">
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
          <div className="ml-1 truncate">{title}</div>
        </div>
        <div className="flex justify-end text-primary gap-1 opacity-0 group-hover:opacity-100">
          <DocumentMenu documentId={id} isFavorited={isFavorited} />
          <Button
            onClick={() => create({ title: "Untitled", parentId: id })}
            size="icon"
            variant="ghost"
          >
            <PlusIcon size={14} />
          </Button>
        </div>
      </li>
      {isExpanded && (
        <>
          {documents?.length ? (
            <div>
              <ul>
                {documents?.map((document) => {
                  const isFavorited = document.favoritedBy.filter(
                    ({ userId }) => userId === session?.sub,
                  );
                  return (
                    <DocumentItem
                      title={document.title}
                      id={document.id}
                      icon={document.icon}
                      level={level + 1}
                      isFavorited={!!isFavorited.length}
                    />
                  );
                })}
              </ul>
            </div>
          ) : (
            <div style={{ paddingLeft: `${level * 15}px` }}>
              <ListItem
                className="text-primary-third"
                title="No pages inside"
                isHover={false}
              />
            </div>
          )}
        </>
      )}
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
