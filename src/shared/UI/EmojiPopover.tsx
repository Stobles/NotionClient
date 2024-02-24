import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { FileIcon } from "lucide-react";
import EmojiPicker, { PickerProps } from "emoji-picker-react";
import Image from "next/image";

type EmojiPopoverType = PickerProps & { icon: string };

export const EmojiPopover = ({ icon, ...props }: EmojiPopoverType) => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center w-5 h-5 hover:bg-accent-dark rounded-[3px]">
        {icon ? (
          <Image src={icon} width={18} height={18} alt="icon" />
        ) : (
          <FileIcon size={18} />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-[350px] p-0 border-0 ml-2">
        <EmojiPicker className="w-full" {...props} />
      </PopoverContent>
    </Popover>
  );
};
