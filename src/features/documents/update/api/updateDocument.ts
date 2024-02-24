import { documentKeys } from "@/entities/document";
import {
  UpdateDocumentDto,
  UpdateParams,
  documentsControllerUpdate,
} from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateDocument(params: UpdateParams) {
  const queryClient = useQueryClient();
  const { mutate: update } = useMutation({
    mutationKey: documentKeys.mutation.update(),
    mutationFn: (data: UpdateDocumentDto) =>
      documentsControllerUpdate(data, params),
    onError: () => {
      toast.error("Ошибка");
    },
    onSuccess() {
      toast.success("Документ успешно изменен");
      queryClient.invalidateQueries({ queryKey: documentKeys.documents.root });
      queryClient.removeQueries({ queryKey: documentKeys.document.root });
    },
  });

  return {
    update,
  };
}
