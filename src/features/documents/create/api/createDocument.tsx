import { articleKeys } from "@/entities/article";
import {
  CreateDocumentDto,
  documentsControllerCreate,
} from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationKey: articleKeys.mutation.create(),
    mutationFn: (document: CreateDocumentDto) =>
      documentsControllerCreate(document),
    onError: () => {
      toast.error("Ошибка");
    },
    onSuccess() {
      toast.success("Документ успешно создан");
      queryClient.invalidateQueries({ queryKey: articleKeys.articles.root });
      queryClient.removeQueries({ queryKey: articleKeys.articles.root });
    },
  });

  return {
    create: (document: CreateDocumentDto) => create.mutate(document),
  };
};
