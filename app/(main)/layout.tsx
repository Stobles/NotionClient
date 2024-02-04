"use client";

import { authGuard } from "@/entities/session";
import { Sidebar } from "@/widgets/Sidebar";
import { MainLayout } from "@/shared/UI/Layouts/MainLayout";

const MainPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout navigation={<Sidebar />}>{children}</MainLayout>;
};

export default authGuard(MainPageLayout);
