import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { FileIcon, SearchIcon } from "lucide-react";

import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { useDocumentsByTitleQuery } from "../";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/UI/Dialog";
import { Input } from "@/shared/UI/Input";
import { ListItem } from "@/shared/UI/ListItem";
import { Separator } from "@/shared/UI/Separator";
import { Tooltip } from "@/shared/UI/Tooltip";

import "tippy.js/dist/tippy.css";
import { DocumentDto } from "@/shared/api/generated";
import { useDebounce } from "@/shared/hooks/useDebounce";

const SearchInput = ({
  setDocuments,
}: {
  setDocuments: Dispatch<DocumentDto[]>;
}) => {
  const [title, setTitle] = useState("");
  const [term, setTerm] = useState("");
  const { data: session } = useSessionQuery();
  const { data: documents } = useDocumentsByTitleQuery({
    title: term,
    limit: 10,
  });
  const debounce = useDebounce((title: string) => setTerm(title), 300);

  useEffect(() => debounce(title), [title]);

  useEffect(() => {
    if (documents) setDocuments(documents);
  }, [documents]);
  return (
    <DialogHeader className="space-y-0">
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
      <Separator />
    </DialogHeader>
  );
};

const SearchContent = () => {
  const [documents, setDocuments] = useState<DocumentDto[]>([]);
  const router = useRouter();

  return (
    <DialogContent className="w-full flex flex-col bottom-0 max-w-[700px] max-h-[max(50vh,_570px)] min-h-[max(50vh,_570px)] p-0 !rounded-xl">
      <SearchInput setDocuments={setDocuments} />

      {documents.length ? (
        <ul className="flex flex-col gap-2">
          {documents.map((doc) => {
            return (
              <li className="mx-1">
                <ListItem
                  Icon={FileIcon}
                  title={doc.title}
                  className="py-2.5"
                  onClick={() => router.push(doc.id)}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col justify-center items-center text-sm text-primary-second">
          <h6 className="font-medium">Нет результатов</h6>
          <p className="text-primary-third">
            Некоторые страницы могут находиться в корзине
          </p>
        </div>
      )}
    </DialogContent>
  );
};

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Dialog>
      <Tooltip title="Найдите нужную страницу быстрее">
        <DialogTrigger onClick={() => setIsOpen(true)}>
          <ListItem Icon={SearchIcon} title="Search" />
        </DialogTrigger>
      </Tooltip>
      {isOpen && <SearchContent />}
    </Dialog>
  );
};
