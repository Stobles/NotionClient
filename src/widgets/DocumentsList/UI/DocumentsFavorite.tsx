import { useFavoritesQuery } from "@/entities/favorites";
import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { DocumentItem } from "./DocumentItem";

export const DocumentsFavorite = () => {
  const { data: session } = useSessionQuery();

  const { data: favorites } = useFavoritesQuery(session ? session?.sub : "");
  return (
    <>
      {!favorites ? (
        <div className="flex flex-col gap-2">
          <DocumentItem.Skeleton level={1} />
          <DocumentItem.Skeleton level={1} />
          <DocumentItem.Skeleton level={1} />
        </div>
      ) : (
        <ul className="py-1 pr-1 overflow-y-auto overflow-x-hidden max-h-[430px]">
          {favorites.map((favorite) => {
            return (
              <DocumentItem
                key={favorite.document.id}
                id={favorite.document.id}
                title={favorite.document.title}
                icon={favorite.document.icon}
                isFavorited={true}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};
