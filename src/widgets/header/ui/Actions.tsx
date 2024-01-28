import { Button } from "@/shared/UI/Button";
import { GetSessionInfoDto } from "@/shared/api/generated";
import { ROUTES } from "@/shared/constants/route";
import Link from "next/link";

export const Actions = ({
  session,
}: {
  session: GetSessionInfoDto | undefined;
}) => {
  return (
    <>
      {session ? (
        <div className="ml-auto justify-end w-full flex items-center gap-x-2">
          Авторизован
        </div>
      ) : (
        <div className="ml-auto md:justify-end justify-between w-fit flex items-center gap-x-2">
          <Button asChild className="text-xs" variant="ghost">
            <Link href={ROUTES.LOGIN}>Log in</Link>
          </Button>
          <Button asChild className="text-xs" variant="default">
            <Link href={ROUTES.REGISTER}>Get notion</Link>
          </Button>
        </div>
      )}
    </>
  );
};
