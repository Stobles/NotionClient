import {
  SearchParams,
  documentsControllerGetAll,
  documentsControllerGetByParentId,
  documentsControllerGetById,
  documentsControllerSearch,
  DocumentsControllerGetByParentIdParams,
} from "@/shared/api/generated";
import { useQuery } from "@tanstack/react-query";

export const documentKeys = {
  documents: {
    root: ["documents"],
    archived: () => [...documentKeys.documents.root, "archived"],
    parent: (parentId: string = "null") => [
      ...documentKeys.documents.root,
      parentId,
    ],
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
    archive: () => [...documentKeys.document.root, "archive"],
    restore: () => [...documentKeys.document.root, "restore"],
  },
};

export function useDocumentsQuery() {
  return useQuery({
    queryKey: documentKeys.documents.root,
    queryFn: documentsControllerGetAll,
  });
}

export function useDocumentByIdQuery(id: string) {
  return useQuery({
    queryKey: documentKeys.document.id(id),
    queryFn: () => documentsControllerGetById({ id }),
  });
}

export function useDocumentsByParentQuery({
  parentId,
}: DocumentsControllerGetByParentIdParams) {
  return useQuery({
    queryKey: documentKeys.documents.parent(parentId),
    queryFn: () => documentsControllerGetByParentId({ parentId }),
  });
}

export function useDocumentsSearch(params: SearchParams) {
  return useQuery({
    queryKey: documentKeys.documents.search(params.query),
    queryFn: () => documentsControllerSearch(params),
  });
}
