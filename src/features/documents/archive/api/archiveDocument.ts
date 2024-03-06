import { documentKeys } from "@/entities/document";
import { favoritesKeys } from "@/entities/favorites";
import {
  CreateDocumentDto,
  documentsControllerArchive,
  documentsControllerCreate,
} from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useArchiveDocument() {
  const queryClient = useQueryClient();

  const { mutate: archive } = useMutation({
    mutationKey: documentKeys.mutation.archive(),
    mutationFn: (documentId: string) => documentsControllerArchive(documentId),
    onError: (e: AxiosError) => {
      if (e.response?.status === 400) {
        return toast.error("Вы не можете удалить последний документ.");
      }
      if (e.response?.status === 404) {
        return toast.error("Документ не был найден.");
      }
      return toast.error("Непредвиденная ошибка");
    },
    onSuccess() {
      toast.info("Документ был перемещен в корзину.");
      queryClient.invalidateQueries({ queryKey: documentKeys.documents.root });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.favorites.root });
      queryClient.invalidateQueries({
        queryKey: documentKeys.documents.archived(),
      });
    },
  });

  return {
    archive,
  };
}
