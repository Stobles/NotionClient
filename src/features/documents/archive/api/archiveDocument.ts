import { DocumentDto } from "@/shared/api/generated";
import { documentKeys } from "@/entities/document";
import { favoritesKeys } from "@/entities/favorites";
import { documentsControllerArchive } from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function useArchiveDocument() {
  const queryClient = useQueryClient();

  const pathname = usePathname();
  const router = useRouter();

  const { mutate: archive } = useMutation({
    mutationKey: documentKeys.mutation.archive(),
    mutationFn: (documentId: string): Promise<DocumentDto> =>
      documentsControllerArchive(documentId),
    onError: (e: AxiosError) => {
      if (e.response?.status === 400) {
        return toast.error("Вы не можете удалить последний документ.");
      }
      if (e.response?.status === 404) {
        return toast.error("Документ не был найден.");
      }
      return toast.error("Непредвиденная ошибка");
    },
    onSuccess(data: DocumentDto) {
      toast.info("Документ был перемещен в корзину.");
      queryClient.invalidateQueries({ queryKey: documentKeys.documents.root });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.favorites.root });
      queryClient.invalidateQueries({
        queryKey: documentKeys.documents.archived(),
      });

      if (pathname === `/documents/${data.id}`) {
        router.back();
      }
    },
  });

  return {
    archive,
  };
}
