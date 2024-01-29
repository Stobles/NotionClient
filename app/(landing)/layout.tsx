import { sessionKeys } from "@/entities/session/api/sessionApi";
import { Header } from "@/widgets/Header";
import { Footer } from "@/views/Home";
import { HomeLayout } from "@/shared/UI/Layouts/HomeLayout";
import { authControllerGetSessionInfo } from "@/shared/api/generated";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Profile } from "@/widgets/Profile/Profile";

export default async function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: sessionKeys.session.currentUser(),
    queryFn: authControllerGetSessionInfo,
  });

  return (
    <HomeLayout
      header={
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Header profile={<Profile />} />
        </HydrationBoundary>
      }
      footer={<Footer />}
    >
      {children}
    </HomeLayout>
  );
}
