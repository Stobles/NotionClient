import { documentKeys } from "@/entities/document";
import { favoritesKeys } from "@/entities/favorites";
import {
  UpdateDocumentDto,
  UpdateParams,
  documentsControllerUpdate,
} from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useUpdateDocument(params: UpdateParams) {
  const queryClient = useQueryClient();
  const { mutate: update } = useMutation({
    mutationKey: documentKeys.mutation.update(),
    mutationFn: (data: UpdateDocumentDto) =>
      documentsControllerUpdate(data, params),
    onError: (e: AxiosError) => {
      console.log(e);
      toast.error("Ошибка");
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: documentKeys.documents.root });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.favorites.root });
      queryClient.invalidateQueries({
        queryKey: documentKeys.document.id(params.id),
      });
    },
  });

  return {
    update,
  };
}
