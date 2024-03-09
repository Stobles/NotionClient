import { FileIcon, MenuIcon, StarIcon } from "lucide-react";
import { Button } from "@/shared/UI/Button";
import { formatTimeToNow, useDocumentByIdQuery } from "@/entities/document";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Rename } from "@/features/documents/update/UI/Rename";
import { useUpdateDocument } from "@/features/documents/update";
import { useToggleFavorite } from "@/features/favorites/toggle";
import { NavbarActions } from "./NavbarActions";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

export const Navbar = ({
  isCollapsed,
  resetWidth,
}: {
  isCollapsed: boolean;
  resetWidth: () => void;
}) => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  const pathname = usePathname();

  const documentId = pathname.split("/")[2];

  const { data: document } = useDocumentByIdQuery(documentId);
  const [isOpen, setIsOpen] = useState(false);

  const title = document?.title || "";
  return (
    <nav className="flex items-center justify-between bg-transparent px-3 py-2 w-full h-full">
      <div className="flex items-center gap-1 flex-1">
        {isCollapsed && (
          <MenuIcon
            onClick={resetWidth}
            role="button"
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        {!isMobile && (
          <Button
            className="flex gap-2"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
          >
            {document?.icon ? (
              <Image
                src={document.icon || ""}
                width={18}
                height={18}
                alt="icon"
              />
            ) : (
              <FileIcon className="w-5 h-5" />
            )}
            {document?.title}
          </Button>
        )}

        <Rename
          id={documentId}
          name={title}
          icon={document?.icon || ""}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="flex gap-2 items-center text-primary-second">
        {document?.updatedAt && (
          <div className="text-sm">
            Edited <span>{formatTimeToNow(new Date(document.updatedAt))}</span>
          </div>
        )}
        <NavbarActions documentId={documentId} isFavorited />
      </div>
    </nav>
  );
};
