import { documentKeys } from "@/entities/document";
import {
  CreateDocumentDto,
  documentsControllerCreate,
} from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationKey: documentKeys.mutation.create(),
    mutationFn: (document: CreateDocumentDto) =>
      documentsControllerCreate(document),
    onError: () => {
      toast.error("Ошибка");
    },
    onSuccess() {
      toast.success("Документ успешно создан");
      queryClient.invalidateQueries({ queryKey: documentKeys.document.root });
      queryClient.removeQueries({ queryKey: documentKeys.document.root });
    },
  });

  return {
    create: (document: CreateDocumentDto) => create.mutate(document),
  };
};
