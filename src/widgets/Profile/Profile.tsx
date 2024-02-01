"use client";

import { useSessionQuery } from "@/entities/session/api/sessionApi";
import { useLogout } from "@/features/auth";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/UI/DropdownMenu";
import { UserAvatar } from "@/shared/UI/UserAvatar";

export const Profile = () => {
  const { data: session } = useSessionQuery();
  const {} = useLogout();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <UserAvatar src={session?.avatar} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>stoble@mail.ru</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
