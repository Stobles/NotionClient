import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  UserAuthRequest,
  UserAuthValidator,
} from "@/features/auth/validators/authValidator";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authControllerSignUpLocal } from "@/shared/api/generated";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { sessionKeys } from "@/entities/session/api/sessionApi";

export const useCreateUser = () => {
  const router = useRouter();

  const form = useForm<UserAuthRequest>({
    resolver: zodResolver(UserAuthValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpMutation = useMutation({
    mutationKey: sessionKeys.mutation.create(),
    mutationFn: authControllerSignUpLocal,
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast.error("Почта уже зарегистрированна.");
          return;
        }

        toast.error("Непредвиденная ошибка!");
      }
    },
    onSuccess() {
      toast.success(`Ссылка для подтверждения была отправлена на ${form.getValues('email')}`)
    },
  });

  return {
    form,
    control: form.control,
    handleSubmit: form.handleSubmit((data) => signUpMutation.mutate(data)),
    isLoading: signUpMutation.isPending,
  };
};
