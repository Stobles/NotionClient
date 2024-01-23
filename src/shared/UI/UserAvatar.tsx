import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export const UserAvatar = ({ src }: { src?: string }) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};
