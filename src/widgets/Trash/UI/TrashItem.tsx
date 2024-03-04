import { useDeleteDocument } from "@/features/documents/delete";
import { useRestoreDocument } from "@/features/documents/restore/api/restoreDocument";
import { Button } from "@/shared/UI/Button";
import { FileIcon, TrashIcon, CornerUpLeftIcon } from "lucide-react";
import Image from "next/image";

export const TrashItem = ({
  id,
  emojiSrc,
  title,
}: {
  id: string;
  emojiSrc: string;
  title: string;
}) => {
  const { restore } = useRestoreDocument();
  const { deleteDocument } = useDeleteDocument();

  const onDelete = () => deleteDocument(id);
  const onRestore = () => restore(id);
  return (
    <div
      className="flex items-center justify-between gap-2 cursor-pointer text-primary-second text-[13px] font-medium py-1 px-3 w-full rounded
      hover:bg-accent transition-colors"
    >
      <div className="flex items-center gap-2">
        {emojiSrc && (
          <Image src={emojiSrc || ""} width={18} height={18} alt="emoji_icon" />
        )}
        {!emojiSrc && (
          <div>
            <FileIcon size={16} />
          </div>
        )}
        <div className="truncate font-normal text-black">{title}</div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          onClick={onRestore}
          variant="ghost"
          className="w-6 h-6"
          size="icon"
        >
          <CornerUpLeftIcon size={16} />
        </Button>
        <Button
          onClick={onDelete}
          variant="ghost"
          className="w-6 h-6"
          size="icon"
        >
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
  );
};
