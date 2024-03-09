import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { DocumentDto } from "@/shared/api/generated";
import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { useDocumentsSearch } from "@/entities/document";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Input } from "@/shared/UI/Input";

export const TrashSearch = ({
  setDocuments,
}: {
  setDocuments: Dispatch<DocumentDto[]>;
}) => {
  const [title, setTitle] = useState("");
  const [term, setTerm] = useState("");
  const { data: documents } = useDocumentsSearch({
    query: term,
    limit: 10,
    parent: true,
    sort: {
      field: "updatedAt",
      type: "desc",
    },
    filters: { isArchived: true },
  });
  const debounce = useDebounce((title: string) => setTerm(title), 300);

  useEffect(() => debounce(title), [title]);

  useEffect(() => {
    if (documents) setDocuments(documents);
  }, [documents]);
  return (
    <div className="flex items-center w-full h-12 px-3 mb-2">
      <Input
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
        placeholder={`Search pages in trash...`}
        className="h-[30px] bg-secondary rounded-sm"
      />
    </div>
  );
};
