import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { DocumentDto } from "@/shared/api/generated";
import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { useDocumentsSearch } from "..";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { DialogHeader } from "@/shared/UI/Dialog";
import { SearchIcon } from "lucide-react";
import { Input } from "@/shared/UI/Input";

export const SearchInput = ({
  setDocuments,
}: {
  setDocuments: Dispatch<DocumentDto[]>;
}) => {
  const [title, setTitle] = useState("");
  const [term, setTerm] = useState("");
  const { data: session } = useSessionQuery();
  const { data: documents } = useDocumentsSearch({
    query: term,
    limit: 10,
    sort: {
      field: "updatedAt",
      type: "desc",
    },
  });
  const debounce = useDebounce((title: string) => setTerm(title), 300);

  useEffect(() => debounce(title), [title]);

  useEffect(() => {
    if (documents) setDocuments(documents);
  }, [documents]);
  return (
    <DialogHeader className="space-y-0 border-b-[1px]">
      <div className="flex items-center w-full h-12 px-3">
        <div className="mr-1.5">
          <SearchIcon className="text-primary-second/70" size={18} />
        </div>
        <Input
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          placeholder={`Search ${session?.username}'s Notion`}
          className="border-0 px-0 focus-visible:ring-0 text-base xs:text-lg placeholder:text-primary-second/50"
        />
      </div>
    </DialogHeader>
  );
};
