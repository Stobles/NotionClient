import { useDocumentsByParentQuery } from "@/entities/document";
import { DocumentItem } from "./DocumentItem";
import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { ListItem } from "@/shared/UI/ListItem";

export const Documents = ({
  parentId = undefined,
  level = 0,
}: {
  parentId?: string;
  level?: number;
}) => {
  const { data: session } = useSessionQuery();
  const { data: documents } = useDocumentsByParentQuery({
    parentId,
  });

  return (
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
                  key={document.id}
                  title={document.title}
                  id={document.id}
                  icon={document.icon}
                  level={level}
                  isFavorited={!!isFavorited.length}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          {parentId === undefined ? (
            <div className="flex flex-col gap-2">
              <DocumentItem.Skeleton level={1} />
              <DocumentItem.Skeleton level={1} />
              <DocumentItem.Skeleton level={1} />
            </div>
          ) : (
            <div style={{ paddingLeft: `${(level - 1) * 15}px` }}>
              <ListItem
                className="text-primary-third"
                title="No pages inside"
                isHover={false}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
