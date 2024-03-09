"use client";

import { Header } from "@/widgets/Header";
import { Footer } from "@/shared/UI/Layouts/components/Footer";
import { HomeLayout } from "@/shared/UI/Layouts/HomeLayout";
import { Profile } from "@/widgets/Profile/Profile";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HomeLayout header={<Header profile={<Profile />} />} footer={<Footer />}>
      {children}
    </HomeLayout>
  );
};

export default HomePageLayout;
