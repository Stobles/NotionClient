import { useCreateDocument } from "@/features/documents/create";
import { PlusIcon } from "lucide-react";
import { ListItem } from "@/shared/UI/ListItem";
import { Documents } from "./UI/Documents";
import { useFavoritesQuery } from "@/entities/favorites";
import { useSessionQuery } from "@/entities/session/api/sessionApi";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/UI/Collapsible";
import { DocumentItem } from "./UI/DocumentItem";
export const DocumentsList = () => {
  const { data: session } = useSessionQuery();
  const { data: favorites } = useFavoritesQuery(
    session?.sub ? session.sub : "",
  );
  const { create } = useCreateDocument();

  return (
    <div className="space-y-2">
      {favorites?.length ? (
        <div>
          <Collapsible>
            <CollapsibleTrigger className="px-2 mb-2">
              <h4 className="text-primary-third text-xs px-1 rounded-sm transition-colors hover:bg-accent-dark hover:text-primary-second">
                Favorites
              </h4>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div>
                <ul>
                  {favorites?.map((favorite) => {
                    return (
                      <DocumentItem
                        key={favorite.document.id}
                        title={favorite.document.title}
                        id={favorite.document.id}
                        icon={favorite.document.icon}
                        level={0}
                        isFavorited={true}
                        updatedAt={favorite.document.updatedAt}
                      />
                    );
                  })}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ) : (
        ""
      )}
      <div>
        <h4 className="text-primary-third text-xs px-1 rounded-sm mx-2 mb-2">
          Documents
        </h4>
        <Documents />
      </div>

      <div onClick={() => create({ title: "Untitled" })}>
        <ListItem Icon={PlusIcon} title="Add a page" />
      </div>
    </div>
  );
};
