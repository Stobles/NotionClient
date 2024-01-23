import { Button } from "@/shared/UI/Button";
import { useLogout } from "../logout";

export const LogoutButton = () => {
  const { logout, isLoading } = useLogout();
  return (
    <Button isLoading={isLoading} onClick={() => logout({})} className="w-full" variant="danger">
      Выйти
    </Button>
  );
};
