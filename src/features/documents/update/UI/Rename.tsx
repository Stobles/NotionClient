import { EmojiPopover } from "@/features/documents/update/UI/EmojiPopover";
import { Input } from "@/shared/UI/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/UI/Popover";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { EmojiClickData } from "emoji-picker-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useUpdateDocument } from "..";

export const Rename = ({
  id,
  name,
  icon,
  isOpen,
  setIsOpen,
}: {
  id: string;
  name: string;
  icon: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState(name);
  const { update } = useUpdateDocument({ id });

  const debounce = useDebounce(
    (title: string) => update({ title: title || "Untitled" }),
    300,
  );

  useEffect(() => {
    if (title != name) debounce(title);
  }, [title]);
  return (
    <Popover open={isOpen}>
      <PopoverTrigger></PopoverTrigger>
      <PopoverContent
        onEscapeKeyDown={() => setIsOpen(false)}
        onPointerDownOutside={() => setIsOpen(false)}
        className="flex gap-1 ml-2 py-1 px-2"
      >
        <EmojiPopover id={id} icon={icon} size="lg" variant="outlined" />
        <Input
          className="h-7 bg-secondary"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
