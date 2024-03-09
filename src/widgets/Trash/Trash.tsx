import { ListItem } from "@/shared/UI/ListItem";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/UI/Popover";
import { TrashIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { TrashSearch } from "./UI/TrashSearch";
import { useState } from "react";
import { DocumentDto } from "@/shared/api/generated";
import { TrashItem } from "./UI/TrashItem";

export const Trash = () => {
  const [documents, setDocuments] = useState<DocumentDto[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Popover>
      <PopoverTrigger>
        <ListItem Icon={TrashIcon} title="Trash" />
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] sm:w-[400px] p-0"
        side={isMobile ? "bottom" : "right"}
      >
        <TrashSearch setDocuments={setDocuments} />
        <div className="mb-2 h-[200px] overflow-y-auto">
          {documents.length ? (
            <ul>
              {documents.map((document) => (
                <li className="px-1">
                  <TrashItem
                    key={document.id}
                    id={document.id}
                    title={document.title}
                    parentTitle={document?.parent?.title || null}
                    emojiSrc={document.icon || ""}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <TrashIcon size={40} />
              <h5 className="text-lg">Your trash is empty.</h5>
              <p className="text-sm text-primary-second">
                Delete something and it will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center text-xs text-primary-third px-4 py-2 border-t-[1px]">
          <span>This is your trash. You can restore or delete any page.</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
