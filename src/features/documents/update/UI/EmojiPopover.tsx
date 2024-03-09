import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../shared/UI/Popover";
import { FileIcon } from "lucide-react";
import EmojiPicker, { EmojiClickData, PickerProps } from "emoji-picker-react";
import Image from "next/image";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../../../shared/libs/shadcn-ui";
import { useUpdateDocument } from "@/features/documents/update";

type EmojiPopoverType = PickerProps &
  VariantProps<typeof pickerVariants> & {
    id: string;
    icon: string;
  };

const pickerVariants = cva(
  "flex items-center justify-center transition-colors hover:bg-black/10 rounded-[3px]",
  {
    variants: {
      variant: {
        default: "",
        outlined: "border",
      },
      size: {
        default: "w-5 h-5",
        lg: "w-7 h-7",
        xl: "w-12 h-12",
        xs: "w-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const EmojiPopover = ({
  id,
  icon,
  size,
  variant,
  ...props
}: EmojiPopoverType) => {
  const { update } = useUpdateDocument({ id });
  const onEmojiClick = (data: EmojiClickData, e: MouseEvent) => {
    update({ icon: data.imageUrl });
  };
  return (
    <Popover>
      <PopoverTrigger className={cn(pickerVariants({ variant, size }))}>
        {icon ? (
          <Image
            src={icon}
            width={100}
            height={100}
            objectFit="contain"
            alt="icon"
          />
        ) : (
          <FileIcon size={10} className="text-primary-second w-full h-full" />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-[350px] p-0 border-0 ml-2">
        <EmojiPicker
          className="w-full"
          onEmojiClick={onEmojiClick}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
};
