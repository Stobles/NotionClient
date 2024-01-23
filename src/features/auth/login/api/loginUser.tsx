import { sessionKeys } from "@/entities/session/api/sessionApi";
import { authControllerSignInLocal } from "@/shared/api/generated";
import { ROUTES } from "@/shared/constants/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  UserAuthRequest,
  UserAuthValidator,
} from "../../validators/authValidator";

export const useLoginUser = () => {
  const router = useRouter();

  const form = useForm<UserAuthRequest>({
    resolver: zodResolver(UserAuthValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useMutation({
    mutationKey: sessionKeys.mutation.login(),
    mutationFn: authControllerSignInLocal,
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          toast.error("Подтвердите почту.");
          return;
        }
        if (err.response?.status === 403) {
          toast.error("Неверный пароль.");
          return;
        }
        if (err.response?.status === 404) {
          toast.error("Пользователь не найден.");
          return;
        }
        if (err.response?.status === 409) {
          toast.error("Почта уже зарегистрированна.");
          return;
        }

        toast.error("Непредвиденная ошибка!");
      }
    },
    onSuccess() {
      toast.success("Вы успешно вошли.");
      router.replace(ROUTES.DOCUMENTS);
    },
  });

  return {
    form,
    control: form.control,
    handleSubmit: form.handleSubmit((data) => signInMutation.mutate(data)),
    isLoading: signInMutation.isPending,
  };
};
