import {
  SearchParams,
  documentsControllerGetAll,
  documentsControllerGetByTitle,
} from "@/shared/api/generated";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const documentKeys = {
  documents: {
    root: ["documents"],
    search: (term: string) => [...documentKeys.documents.root, term],
  },
  document: {
    root: ["document"],
    slug: (slug: string) => [...documentKeys.document.root, slug],
  },
  mutation: {
    create: () => [...documentKeys.document.root, "create"],
  },
};

export function useDocumentsQuery() {
  return useQuery({
    queryKey: documentKeys.documents.root,
    queryFn: documentsControllerGetAll,
  });
}

export function useDocumentsByTitleQuery(params: SearchParams) {
  return useQuery({
    queryKey: documentKeys.documents.search(params.title),
    queryFn: () => documentsControllerGetByTitle(params),
  });
}
