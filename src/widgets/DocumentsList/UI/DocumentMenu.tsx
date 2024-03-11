import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { useArchiveDocument } from "@/features/documents/archive";
import { useToggleFavorite } from "@/features/favorites/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/UI/DropdownMenu";
import { Separator } from "@/shared/UI/Separator";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import {
  CopyIcon,
  Link2Icon,
  MoreHorizontal,
  StarIcon,
  PenSquare,
  ArrowUpRight,
  StarOffIcon,
  TrashIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export const DocumentMenu = ({
  documentId,
  isFavorited,
  documentLink,
  updatedAt,
  setIsOpen,
}: {
  documentId: string;
  isFavorited: boolean;
  documentLink: string;
  updatedAt: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSessionQuery();
  const { toggle } = useToggleFavorite();
  const { archive } = useArchiveDocument();
  const { copy } = useCopyToClipboard();

  const onFavorite = () => {
    toggle({ userId: session ? session.sub : "", documentId });
  };
  const onCopyLink = () => {
    copy(documentLink);
  };
  const onDelete = () => {
    archive(documentId);
  };
  const onOpenNewTab = () => {
    window.open(documentLink, "_blank");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center w-5 h-5 hover:bg-accent-dark rounded-sm transition-colors mr-2 md:mr-0">
        <MoreHorizontal size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[265px] py-1.5 px-0">
        <DropdownMenuItem onClick={onFavorite} className="py-1 mx-1">
          {isFavorited ? (
            <StarOffIcon size={17} className="mr-1" />
          ) : (
            <StarIcon size={17} className="mr-1" />
          )}

          {isFavorited ? (
            <div className="mx-1">Remove from favorites</div>
          ) : (
            <div className="mx-1">Add to favorites</div>
          )}
        </DropdownMenuItem>
        <Separator className="my-1.5" />
        <DropdownMenuItem onClick={onCopyLink} className="py-1 mx-1">
          <Link2Icon size={17} className="mr-1" />
          <div className="mx-1">Copy link</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}} className="py-1 mx-1">
          <CopyIcon size={17} className="mr-1" />
          <div className="mx-1">Duplicate</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsOpen(true)} className="py-1 mx-1">
          <PenSquare size={17} className="mr-1" />

          <div className="mx-1">Rename</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="py-1 mx-1">
          <TrashIcon size={17} className="mr-1" />
          <div className="mx-1">Delete</div>
        </DropdownMenuItem>
        <Separator className="my-1.5" />
        <DropdownMenuItem onClick={onOpenNewTab} className="py-1 mx-1">
          <ArrowUpRight size={17} className="mr-1" />
          <div className="mx-1">Open in new tab</div>
        </DropdownMenuItem>
        <Separator className="my-1.5" />
        <div className="text-xs mx-3 mt-2.5 text-primary-third">
          <div className="mb-1">Last edited by {session?.username}</div>
          <div>{new Date(updatedAt).toUTCString().replace("GMT", "")}</div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
