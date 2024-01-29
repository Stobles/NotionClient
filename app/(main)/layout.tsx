"use client";

import { authGuard } from "@/entities/session";
import { Navigation } from "@/views/Documents";
import { MainLayout } from "@/shared/UI/Layouts/MainLayout";

const MainPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout navigation={<Navigation />}>{children}</MainLayout>;
};

export default authGuard(MainPageLayout);
