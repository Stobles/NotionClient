import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { useSignOut } from "@/features/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/UI/DropdownMenu";
import { UserAvatar } from "@/shared/UI/UserAvatar";
import { ChevronsUpDownIcon } from "lucide-react";

export const Profile = ({ isFull }: { isFull?: boolean }) => {
  const { data: session } = useSessionQuery();

  const { signOut, isLoading } = useSignOut();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center gap-2 p-0">
        <UserAvatar size={isFull ? "xs" : "default"} src={session?.avatar} />
        {isFull ? (
          <>
            <div className="text-[13px] font-semibold truncate">
              {session?.username}'s Notion
            </div>
            <ChevronsUpDownIcon size={12} />
          </>
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[320px] p-0 m-2">
        <DropdownMenuLabel className="p-0 mt-2 mx-3 text-xs font-normal text-primary-third">
          {session?.email}
        </DropdownMenuLabel>
        <div className="p-2">
          <DropdownMenuItem className="p-0">
            <div className="flex items-center gap-2 px-3 py-1">
              <UserAvatar src={session?.avatar} />
              <div>{session?.username}'s Notion</div>
            </div>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="m-0" />
        <div className="text-primary-third p-1 bg-secondary">
          <DropdownMenuItem className="font-normal text-xs">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => signOut()}
            className="font-normal text-xs"
          >
            Log out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
