import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/UI/DropdownMenu";
import { Separator } from "@/shared/UI/Separator";
import {
  CopyIcon,
  Link2Icon,
  LucideIcon,
  MoreHorizontal,
  StarIcon,
  PenSquare,
  ArrowUpRight,
} from "lucide-react";

const MenuItem = ({ Icon, title }: { Icon: LucideIcon; title: string }) => {
  return (
    <DropdownMenuItem className="py-1 mx-1">
      <Icon size={17} className="mr-1" />
      <div className="mx-1">{title}</div>
    </DropdownMenuItem>
  );
};

export const DocumentMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center w-5 h-5 hover:bg-accent-dark rounded-sm transition-colors">
        <MoreHorizontal size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[265px] py-1.5 px-0">
        <MenuItem Icon={StarIcon} title="Add to favorites" />
        <Separator className="my-1.5" />
        <MenuItem Icon={Link2Icon} title="Copy link" />
        <MenuItem Icon={CopyIcon} title="Duplicate" />
        <MenuItem Icon={PenSquare} title="Rename" />
        <Separator className="my-1.5" />
        <MenuItem Icon={ArrowUpRight} title="Open in new tab" />
        <Separator className="my-1.5" />
        <div className="text-xs mx-3 mt-2.5 text-primary-third">
          <div className="mb-1">Last edited by Stoble</div>
          <div>Dec 15, 2023, 5:29 PM</div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
