import { documentKeys } from "@/entities/document";
import { favoritesKeys } from "@/entities/favorites";
import {
  FavoriteDto,
  CreateFavoriteDto,
  favoritesControllerToggleFavorite,
} from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  const { mutate: toggle } = useMutation({
    mutationKey: favoritesKeys.mutation.toggle(),
    mutationFn: (data: CreateFavoriteDto) =>
      favoritesControllerToggleFavorite(data),
    onError: () => {
      toast.error("Не удалось добавить документ в избранное.");
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: favoritesKeys.favorites.root });
      queryClient.invalidateQueries({ queryKey: documentKeys.documents.root });
    },
  });

  return { toggle };
}
