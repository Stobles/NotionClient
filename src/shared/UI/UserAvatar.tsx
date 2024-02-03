import { cn } from "../libs/shadcn-ui";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { VariantProps, cva } from "class-variance-authority";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "w-10 h-10",
      sm: "w-8 h-8",
      xs: "w-6 h-6 text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type UserAvatarType = VariantProps<typeof avatarVariants> & {
  src?: string;
  className?: string;
};

export const UserAvatar = ({ src, className, size }: UserAvatarType) => {
  return (
    <Avatar className={cn(avatarVariants({ size, className }))}>
      <AvatarImage src={src} />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};
