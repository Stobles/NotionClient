import { useDocumentsByParentQuery } from "@/entities/document";
import { DocumentItem } from "./UI/DocumentItem";
import { useCreateDocument } from "@/features/documents/create";
import { PlusIcon } from "lucide-react";
import { ListItem } from "@/shared/UI/ListItem";

export const DocumentsList = () => {
  const { data: documents } = useDocumentsByParentQuery({ parentId: "null" });

  const { create } = useCreateDocument();

  return (
    <div>
      {!documents ? (
        <div className="flex flex-col gap-2">
          <DocumentItem.Skeleton level={1} />
          <DocumentItem.Skeleton level={1} />
          <DocumentItem.Skeleton level={1} />
        </div>
      ) : (
        <ul className="py-1 pr-1 overflow-y-auto overflow-x-hidden max-h-[430px]">
          {documents?.map((document) => (
            <DocumentItem
              key={document.id}
              id={document.id}
              title={document.title}
              icon={document.icon}
            />
          ))}
        </ul>
      )}

      <div onClick={() => create({ title: "Untitled" })}>
        <ListItem Icon={PlusIcon} title="Add a page" />
      </div>
    </div>
  );
};
