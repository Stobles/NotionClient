"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/UI/Form";
import { Input } from "@/shared/UI/Input";
import { Button } from "@/shared/UI/Button";
import { useLoginUser } from "../login";

export const SignInForm = () => {
  const { form, control, handleSubmit, isLoading } = useLoginUser();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-[12px] mb-1 text-gray-500">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="email"
                  className="p-0 text-[15px] h-[34px] bg-stone-100 py-1 px-3 rounded-sm placeholder:text-gray-400 placeholder:text-xs"
                  placeholder="Введите свою почту..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-normal text-red-600 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-[12px] mb-1 text-gray-500">
                Пароль
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="password"
                  className="p-0 text-[15px] h-[34px] bg-stone-100 py-1 px-3 rounded-sm placeholder:text-gray-400 placeholder:text-xs"
                  placeholder="Введите пароль..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-normal text-red-600" />
            </FormItem>
          )}
        />
        <Button
          variant={"danger"}
          isLoading={isLoading}
          className="w-full mt-3"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </Form>
  );
};
