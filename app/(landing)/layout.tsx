"use client";

import { Header } from "@/widgets/Header";
import { Footer } from "@/views/Home";
import { HomeLayout } from "@/shared/UI/Layouts/HomeLayout";
import { Profile } from "@/widgets/Profile/Profile";
import { guestGuard } from "@/entities/session";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HomeLayout header={<Header profile={<Profile />} />} footer={<Footer />}>
      {children}
    </HomeLayout>
  );
};

export default guestGuard(HomePageLayout);
