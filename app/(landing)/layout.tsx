import { sessionKeys } from "@/entities/session/api/sessionApi";
import { Navbar } from "@/views/Home";
import { Footer } from "@/views/Home";
import { HomeLayout } from "@/views/Layouts/HomeLayout";
import { authControllerGetSessionInfo } from "@/shared/api/generated";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

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
          <Navbar />
        </HydrationBoundary>
      }
      footer={<Footer />}
    >
      {children}
    </HomeLayout>
  );
}
