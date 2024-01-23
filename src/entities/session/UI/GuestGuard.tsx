'use client'

import { PageLoader } from "@/shared/UI/PageLoader";
import { useSessionQuery } from "../api/sessionApi";
import { ROUTES } from "@/shared/constants/route";
import { useRouter } from "next/navigation";
import { PropsWithChildren, ReactElement } from "react";

function guestGuard<P>(Component: (props: P) => ReactElement) {
  return function GuestGuard(props: PropsWithChildren<P>) {
    const router = useRouter();

    const { data, isPending } = useSessionQuery();

    if(isPending) return <PageLoader />

    if(data) {
      router.replace('/');
    }

    return <Component {...props} />;
  };
}

export default guestGuard;