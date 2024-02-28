import { useCreateDocument } from "@/features/documents/create";
import { PlusIcon } from "lucide-react";
import { ListItem } from "@/shared/UI/ListItem";
import { DocumentsAll } from "./UI/DocumentsAll";
import { DocumentsFavorite } from "./UI/DocumentsFavorite";

export const DocumentsList = () => {
  const { create } = useCreateDocument();

  return (
    <div>
      <DocumentsFavorite />
      <DocumentsAll />
      <div onClick={() => create({ title: "Untitled" })}>
        <ListItem Icon={PlusIcon} title="Add a page" />
      </div>
    </div>
  );
};
