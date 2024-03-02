import { favoritesControllerGetAll } from "@/shared/api/generated";
import { useQuery } from "@tanstack/react-query";

export const favoritesKeys = {
  favorites: {
    root: ["favorites"],
    parent: (parentId: string) => [...favoritesKeys.favorites.root, parentId],
  },
  mutation: {
    toggle: () => [...favoritesKeys.favorites.root, "toggle"],
  },
};

export function useFavoritesQuery(userId: string) {
  return useQuery({
    queryKey: favoritesKeys.favorites.root,
    queryFn: () => favoritesControllerGetAll(userId),
  });
}
