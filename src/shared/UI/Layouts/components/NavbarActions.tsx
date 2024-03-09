import { useFavoritesQuery } from "@/entities/favorites";
import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { useToggleFavorite } from "@/features/favorites/toggle";
import { Button } from "@/shared/UI/Button";
import { StarIcon, StarOff } from "lucide-react";

export const NavbarActions = ({
  documentId,
}: {
  documentId: string;
  isFavorited: boolean;
}) => {
  const { data: session } = useSessionQuery();
  const { data: favorites } = useFavoritesQuery(session?.sub || "");
  const isFavorited = favorites?.some(
    (favorite) => favorite.documentId === documentId,
  );
  const { toggle } = useToggleFavorite();

  const onFavorite = () => {
    toggle({ userId: session ? session.sub : "", documentId });
  };

  return (
    <>
      <Button
        onClick={onFavorite}
        className="w-7 h-7"
        size="icon"
        variant="ghost"
      >
        {!isFavorited ? <StarIcon size={20} /> : <StarOff size={20} />}
      </Button>
    </>
  );
};
