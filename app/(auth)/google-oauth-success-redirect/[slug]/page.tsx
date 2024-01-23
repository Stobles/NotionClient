"use client";

import { PageLoader } from "@/shared/UI/PageLoader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface GooglePageSuccessProps {
  params: {
    slug: string;
  };
}

const GooglePageSuccess = ({ params: { slug } }: GooglePageSuccessProps) => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/" + slug);
  }, [router, slug]);
  return <PageLoader />;
};

export default GooglePageSuccess;
