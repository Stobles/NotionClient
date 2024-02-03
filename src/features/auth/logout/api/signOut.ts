import { sessionKeys } from "@/entities/session/api/sessionApi";
import { authControllerLogout } from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: sessionKeys.mutation.logout(),
    mutationFn: () => authControllerLogout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionKeys.session.currentUser(),
      });
      queryClient.removeQueries({
        queryKey: sessionKeys.session.currentUser(),
      });
      router.refresh();
    },
  });

  return {
    signOut: mutateAsync,
    isLoading: isPending,
  };
};
