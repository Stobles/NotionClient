import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FileIcon, SearchIcon } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/shared/UI/Dialog";
import { ListItem } from "@/shared/UI/ListItem";
import { Tooltip } from "@/shared/UI/Tooltip";

import "tippy.js/dist/tippy.css";
import { DocumentDto } from "@/shared/api/generated";
import { SearchInput } from "./SearchInput";

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
