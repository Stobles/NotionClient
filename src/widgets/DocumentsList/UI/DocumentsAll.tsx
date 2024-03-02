import { useDocumentsByParentQuery } from "@/entities/document";
import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { DocumentItem } from "./DocumentItem";

export const DocumentsAll = () => {
  const { data: session } = useSessionQuery();
  const { data: documents } = useDocumentsByParentQuery({ parentId: "null" });
  return (
    <>
      {!documents ? (
        <div className="flex flex-col gap-2">
          <DocumentItem.Skeleton level={1} />
          <DocumentItem.Skeleton level={1} />
          <DocumentItem.Skeleton level={1} />
        </div>
      ) : (
        <ul className="py-1 pr-1 overflow-y-auto overflow-x-hidden max-h-[430px]">
          {documents.map((document) => {
            const isFavorited = document.favoritedBy.filter(
              ({ userId }) => userId === session?.sub,
            );
            return (
              <DocumentItem
                key={document.id}
                id={document.id}
                title={document.title}
                icon={document.icon}
                isFavorited={!!isFavorited.length}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};
