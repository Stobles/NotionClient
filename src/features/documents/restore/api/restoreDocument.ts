import { documentKeys } from "@/entities/document";
import { documentsControllerRestore } from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useRestoreDocument() {
  const queryClient = useQueryClient();

  const { mutate: restore } = useMutation({
    mutationKey: documentKeys.mutation.restore(),
    mutationFn: (id: string) => documentsControllerRestore(id),
    onError: (e: AxiosError) => {
      if (e.response?.status === 404) {
        return toast.error("Документ не был найден.");
      }
      return toast.error(
        "Ошибка при восстановлении документа. Перезагрузите страницу и попробуйте еще раз.",
      );
    },
    onSuccess() {
      toast.info("Документ был восстановлен");
      queryClient.invalidateQueries({ queryKey: documentKeys.documents.root });
      queryClient.invalidateQueries({
        queryKey: documentKeys.documents.archived(),
      });
    },
  });

  return {
    restore,
  };
}
