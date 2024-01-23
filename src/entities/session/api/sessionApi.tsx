import { authControllerGetSessionInfo } from "@/shared/api/generated";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const sessionKeys = {
  session: {
    root: ["session"],
    currentUser: () => [...sessionKeys.session.root, "currentUser"],
  },
  mutation: {
    create: () => [...sessionKeys.session.root, "register"],
    login: () => [...sessionKeys.session.root, "login"],
    logout: () => [...sessionKeys.session.root, "logout"],
  },
};

export function useSessionQuery() {
  return useQuery({
    queryKey: sessionKeys.session.currentUser(),
    queryFn: authControllerGetSessionInfo,
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });
}

export function useResetSession() {
  const queryClient = useQueryClient();
  return () => queryClient.removeQueries();
}
