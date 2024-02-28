import { documentKeys } from "@/entities/document";
import { documentsControllerDelete } from "@/shared/api/generated_new";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  const { mutate: deleteDocument } = useMutation({
    mutationKey: documentKeys.mutation.create(),
    mutationFn: (id: string) => documentsControllerDelete(id),
    onError: () => {
      toast.error(
        "Ошибка при удалении документа. Перезагрузите страницу и попробуйте еще раз.",
      );
    },
    onSuccess() {
      toast.success("Документ успешно удален");
      queryClient.invalidateQueries({ queryKey: documentKeys.documents.root });
      queryClient.removeQueries({ queryKey: documentKeys.document.root });
    },
  });

  return {
    deleteDocument,
  };
}
