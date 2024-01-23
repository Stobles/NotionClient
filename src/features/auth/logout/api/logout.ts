import { sessionKeys } from "@/entities/session/api/sessionApi";
import { authControllerLogout } from "@/shared/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const signOut = useMutation({
    mutationKey: sessionKeys.mutation.logout(),
    mutationFn: authControllerLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      router.refresh();
    },
  });

  return {
    logout: signOut.mutate,
    isLoading: signOut.isPending,
  };
};
