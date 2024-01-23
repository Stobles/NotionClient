"use client";

import { PageLoader } from "@/shared/UI/PageLoader";
import { useSessionQuery } from "../api/sessionApi";
import { ROUTES } from "@/shared/constants/route";
import { useRouter } from "next/navigation";
import { PropsWithChildren, ReactElement } from "react";

function authGuard<P>(Component: (props: P) => ReactElement) {
  return function AuthGuard(props: PropsWithChildren<P>) {
    const router = useRouter();

    const { data, isError } = useSessionQuery();

    if (data) return <Component {...props} />;

    if (isError) router.replace(ROUTES.REGISTER);

    return <PageLoader />;
  };
}

export default authGuard;
