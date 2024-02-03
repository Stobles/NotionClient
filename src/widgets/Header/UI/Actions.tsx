import { Button } from "@/shared/UI/Button";
import { ROUTES } from "@/shared/constants/route";
import Link from "next/link";

export const Actions = () => {
  return (
    <>
      <Button asChild className="text-xs" variant="ghost">
        <Link href={ROUTES.LOGIN}>Log in</Link>
      </Button>
      <Button asChild className="text-xs" variant="default">
        <Link href={ROUTES.REGISTER}>Get notion</Link>
      </Button>
    </>
  );
};
