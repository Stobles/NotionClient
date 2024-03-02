import {
  SearchByTitleParams,
  SearchByParentParams,
  documentsControllerGetAll,
  documentsControllerGetByParentId,
  documentsControllerGetByTitle,
} from "@/shared/api/generated";
import { useQuery } from "@tanstack/react-query";

export const documentKeys = {
  documents: {
    root: ["documents"],
    parent: (parentId: string) => [...documentKeys.documents.root, parentId],
    search: (term: string) => [...documentKeys.documents.root, term],
  },
  document: {
    root: ["document"],
    id: (id: string) => [...documentKeys.document.root, id],
  },
  mutation: {
    create: () => [...documentKeys.document.root, "create"],
    update: () => [...documentKeys.document.root, "update"],
    delete: () => [...documentKeys.document.root, "delete"],
  },
};

export function useDocumentsQuery() {
  return useQuery({
    queryKey: documentKeys.documents.root,
    queryFn: documentsControllerGetAll,
  });
}

export function useDocumentsByParentQuery(params: SearchByParentParams) {
  return useQuery({
    queryKey: documentKeys.documents.parent(params.parentId),
    queryFn: () => documentsControllerGetByParentId(params),
  });
}

export function useDocumentsByTitleQuery(params: SearchByTitleParams) {
  return useQuery({
    queryKey: documentKeys.documents.search(params.title),
    queryFn: () => documentsControllerGetByTitle(params),
  });
}
